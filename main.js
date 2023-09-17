
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', () => {
  // Your code to notify the user that an update is available
    console.log("update available");
});

autoUpdater.on('update-downloaded', () => {
  // Your code to notify the user that the update is ready to be installed
    console.log("update downloaded");
    autoUpdater.quitAndInstall();
});


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    //   nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('sort-lists', (event, arg) => {
//   // Write the input data to a JSON file
  // fs.writeFileSync('input.json', JSON.stringify(arg));
  // Get the user data directory
  const userDataDir = app.getPath('userData');

  // Define the input and output file paths
  const inputFilePath = path.join(userDataDir, 'input.json');

  // Write the input data to a JSON file in the user data directory
  var input = JSON.stringify(arg);
  console.log("input: ", input);
  console.log("writing input to: ", inputFilePath);
  fs.writeFileSync(inputFilePath, JSON.stringify(arg));
  

  // Run the R script
  exec('Rscript merge_sort_lists.R input.json output.json', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing R script: ${error}`);
      event.reply('sort-lists-reply', { error: 'Failed to sort lists' });
      return;
    }

    // Read the output JSON file to get the sorted list
    const userDataDir = app.getPath('userData');
    const outputFilePath = path.join(userDataDir, 'output.json');
    const outputData = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
    const sortedList = outputData.sorted_list;

    // Send the sorted list back to the renderer process
    event.reply('sort-lists-reply', { sortedList });
  });
});
