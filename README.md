# biostatsapp

An Electron application that interfaces Node.js with R to create a local app.

## Install

To install, go to the Release page and install the latest *.exe or *.dmg file. 

## Developers

### Architecture of the App

- `index.html`: The UI
- `renderer.js`: The JavaScript (UI controller). This stores the user input to `input.json`, and reads the output form `output.json` to display it in the UI.
- `merge_sort_lists.R`: The R application that takes in input from `input.json`, processes it, and stores the output to `output.json`.
- `preload.js`: Exposes NodeJS stuff to the HTML code
- `main.js`: Connects the NodeJS to the R application by calling the R script


### Testing

Stop server (if running), and run `npm run start`. This will run the latest code.

When making code changes, stop and restart server (same command) to ensure latest code changes are picked up.

Two places to check for errors:
- Inspector of the Electron app. (cmd+option+i on Mac, alt+shift+i on Windows/Linux)
- Terminal where you ran `npm run start`

### Building & Publishing

To build & publish release to Github for Windows and Mac: `export GH_TOKEN=<token> && npm run prepublish`

To only build on Mac (for Windows): `npm run dist -- --win`
To only build on Mac (for mac): `npm run dist`