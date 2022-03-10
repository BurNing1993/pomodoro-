import { ipcMain, nativeImage } from 'electron'
import { setTrayIcon } from './tray'
import {
  close as closeMainWindow,
  minimize as minimizeMainWindow,
  toggleDevtools as toggleMainDevtools,
} from './windows/main'

export const ipcEvent = {
  CLOSE: 'close',
  MINIMIZE: 'minimize',
  TOGGLE_DEVTOOLS: 'toggle_devtools',
  UPDATE_TRAY_ICON: 'update_tray_icon',
}

export default function handleIpc() {
  ipcMain.handle(ipcEvent.CLOSE, (e, quit = false) => {
    closeMainWindow(quit)
  })
  ipcMain.handle(ipcEvent.MINIMIZE, () => {
    minimizeMainWindow()
  })
  ipcMain.handle(ipcEvent.TOGGLE_DEVTOOLS, () => {
    toggleMainDevtools()
  })
  ipcMain.handle(ipcEvent.UPDATE_TRAY_ICON, (e, imageUrl) => {
    const nativeImg = nativeImage.createFromDataURL(imageUrl)
    setTrayIcon(nativeImg)
  })
}
