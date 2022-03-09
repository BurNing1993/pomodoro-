import { ipcMain } from 'electron'
import {
  close as closeMainWindow,
  minimize as minimizeMainWindow,
  toggleDevtools as toggleMainDevtools,
} from './windows/main'

export const ipcEvent = {
  CLOSE: 'close',
  MINIMIZE: 'minimize',
  TOGGLE_DEVTOOLS:'toggle_devtools'
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
}
