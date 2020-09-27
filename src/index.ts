import {app, BrowserWindow, dialog, ipcMain} from "electron";
import path from "path";
import fs from "fs";
import ImageIO from "./image/ImageIO";

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        title: 'F2I Utility',
        titleBarStyle: "hidden",
        resizable: false,
        fullscreenable: false,
    });

    ipcMain.handle('text', (event, ...args) => {
        ImageIO.textToImage(args[0]).then(value => {
            value.getBase64Async("image/png").then(value1 => win.webContents.send('imgNew', {base: value1, bitmap: value.bitmap}));
        }).catch();
    });

    ipcMain.handle('openImage', event => {
        dialog.showOpenDialog({
            message: 'Select file to decode',
            properties: ["openFile"]
        }).then(value => {
            if(!value.canceled){
                ImageIO.imagePathToText(value.filePaths[0]).then(text => {
                    win.webContents.send('displayText', {text, path: value.filePaths[0]});
                }).catch();
            }
        }) ;
    });

    ipcMain.handle('saveImage', (event, imageBase64) => {
        dialog.showSaveDialog({
            message: 'Save file',
            defaultPath: `ci-${new Date().getTime()}.png`
        }).then(value => {
            if(!value.canceled){
                const base64Image = imageBase64.split(';base64,').pop();
                fs.writeFile(value.filePath!, base64Image, {encoding: 'base64'}, err => {
                    if(err) dialog.showErrorBox('Saving error', err.message);
                });
            }
        });
    });

    // and load the index.html of the app.
    win.loadFile(path.resolve(__dirname, "../src/static/index.html"));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit()
});