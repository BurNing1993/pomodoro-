import { app, Menu, Tray } from 'electron'
import * as path from 'path'
import {
  toggleShow as toggleShowMainWindow,
  show as showMainWindow,
} from './windows/main'

let tray: Tray = null!

const appName = '番茄钟'

export function setTray() {
  tray = new Tray(path.join(__dirname, 'assets/icon_win32.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开' + appName, click: showMainWindow },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', toggleShowMainWindow)
  tray.setToolTip(appName)
  tray.setTitle('This is my title')
}

export function setTrayIcon(image: string | Electron.NativeImage) {
  tray.setImage(image)
}