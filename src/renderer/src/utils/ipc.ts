import { ipcRenderer } from 'electron'

export const ipcEvent = {
  CLOSE: 'close',
  MINIMIZE: 'minimize',
  TOGGLE_DEVTOOLS: 'toggle_devtools',
  UPDATE_TRAY_ICON: 'update_tray_icon',
}

export function closeWindow(quit = false) {
  ipcRenderer.invoke(ipcEvent.CLOSE, quit)
}

export function minimizeWindow() {
  ipcRenderer.invoke(ipcEvent.MINIMIZE)
}

export function toggleDevtools() {
  ipcRenderer.invoke(ipcEvent.TOGGLE_DEVTOOLS)
}

export function updateTrayIcon(imageUrl:string)  {
  ipcRenderer.invoke(ipcEvent.UPDATE_TRAY_ICON, imageUrl)
}
