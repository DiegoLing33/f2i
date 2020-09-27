/*
 * ██╗░░░░░██╗███╗░░██╗░██████╗░░░░██████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗
 * ██║░░░░░██║████╗░██║██╔════╝░░░░██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░██╔╝
 * ██║░░░░░██║██╔██╗██║██║░░██╗░░░░██████╦╝██║░░░░░███████║██║░░╚═╝█████═╝░
 * ██║░░░░░██║██║╚████║██║░░╚██╗░░░██╔══██╗██║░░░░░██╔══██║██║░░██╗██╔═██╗░
 * ███████╗██║██║░╚███║╚██████╔╝░░░██████╦╝███████╗██║░░██║╚█████╔╝██║░╚██╗
 * ╚══════╝╚═╝╚═╝░░╚══╝░╚═════╝░░░░╚═════╝░╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
 *
 * Developed by Yakov V. Panov (C) Ling • Black 2020
 * @site http://ling.black
 */

/*
 * ██╗░░░░░██╗███╗░░██╗░██████╗░░░░██████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗
 * ██║░░░░░██║████╗░██║██╔════╝░░░░██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░██╔╝
 * ██║░░░░░██║██╔██╗██║██║░░██╗░░░░██████╦╝██║░░░░░███████║██║░░╚═╝█████═╝░
 * ██║░░░░░██║██║╚████║██║░░╚██╗░░░██╔══██╗██║░░░░░██╔══██║██║░░██╗██╔═██╗░
 * ███████╗██║██║░╚███║╚██████╔╝░░░██████╦╝███████╗██║░░██║╚█████╔╝██║░╚██╗
 * ╚══════╝╚═╝╚═╝░░╚══╝░╚═════╝░░░░╚═════╝░╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
 *
 * Developed by Yakov V. Panov (C) Ling • Black 2020
 * @site http://ling.black
 */

import {app, BrowserWindow, dialog, ipcMain} from "electron";
import path from "path";
import fs from "fs";
import ImageIO from "./image/ImageIO";
import child_process from "child_process";

/**
 * Возвращает путь до файлов модуля
 */
function getModulePath(): string {
    return __dirname.replace("/dist", "");
}


const ELECTRON_PATH = __dirname.replace("/dist", "") +
    "/node_modules/.bin/electron";


/**
 * Запускает электрон
 * @param flags
 */
function launchElectron(flags: string[] = []) {
    flags.push("gui");
    child_process.exec(path.resolve(ELECTRON_PATH) + " " + getModulePath() + '/dist ' + flags.join(" "));
}


const cliArgs = process.argv.slice(2);
if (cliArgs.length === 0) {
    launchElectron();
} else {
    if (cliArgs.indexOf("gui") > -1) {
        gui(path.resolve("./"))
    } else {
        // cli(cliArgs);
    }
}

function gui(wd?: string) {
    function createWindow() {
        // Create the browser window.
        const win = new BrowserWindow({
            width: 1000,
            height: 700,
            darkTheme: true,
            webPreferences: {
                nodeIntegration: true
            },
            icon: path.resolve(getModulePath() + "/resources/icon.png"),
            title: 'F2I Utility',
            titleBarStyle: "hidden",
            resizable: false,
            fullscreenable: false,
        });

        ipcMain.handle('text', (event, ...args) => {
            ImageIO.textToImage(args[0]).then(value => {
                value.getBase64Async("image/png").then(value1 => win.webContents.send('imgNew', {
                    base: value1,
                    bitmap: value.bitmap
                }));
            }).catch();
        });

        ipcMain.handle('openImage', event => {
            dialog.showOpenDialog({
                message: 'Select file to decode',
                properties: ["openFile"]
            }).then(value => {
                if (!value.canceled) {
                    ImageIO.imagePathToText(value.filePaths[0]).then(text => {
                        win.webContents.send('displayText', {text, path: value.filePaths[0]});
                    }).catch();
                }
            });
        });

        ipcMain.handle('saveImage', (event, imageBase64) => {
            dialog.showSaveDialog({
                message: 'Save file',
                defaultPath: `ci-${new Date().getTime()}.png`
            }).then(value => {
                if (!value.canceled) {
                    const base64Image = imageBase64.split(';base64,').pop();
                    fs.writeFile(value.filePath!, base64Image, {encoding: 'base64'}, err => {
                        if (err) dialog.showErrorBox('Saving error', err.message);
                    });
                }
            });
        });


        win.setResizable(false);
        win.setMenu(null);
        win.center()
        win.loadFile(path.resolve(getModulePath(), "src/static/index.html"));
    }

    app.whenReady().then(createWindow);

    app.on('window-all-closed', () => {
        app.quit()
    });
}

export {ImageIO};