import { app, Menu, Tray } from "electron";
import * as path from 'path';
import { show as showMainWindow, toggleShow as toggleShowMainWindow } from '../windows/main';

let tray: Tray | null = null

const appName = '番茄钟'

export default function setTray() {
    tray = new Tray(path.join(__dirname, import.meta.env.BASE_URL, 'icon_win32.png'))
    const contextMenu = Menu.buildFromTemplate([
        { label: '打开' + appName, click: showMainWindow },
        { type: 'separator' },
        { label: '退出', click: () => { app.quit() } }
    ])
    tray.setContextMenu(contextMenu)
    tray.on('click', toggleShowMainWindow)
    tray.setToolTip(appName)
    tray.setTitle('This is my title')
}
