console.log("loading renderer.js");
const { ipcRenderer } = window.electron;

document.getElementById('sortButton').addEventListener('click', () => {
  const list1 = document.getElementById('list1').value.split(',').map(Number);
  const list2 = document.getElementById('list2').value.split(',').map(Number);

  console.log("Got list1: ", list1);
  console.log("Got list2: ", list2);

  ipcRenderer.send('sort-lists', { list1, list2 });
});

ipcRenderer.on('sort-lists-reply', (event, arg) => {
  if (arg.error) {
    alert('An error occurred: ' + arg.error);
    return;
  }

  const sortedList = arg.sortedList;
  document.getElementById('sortedList').innerText = sortedList.join(', ');
});
