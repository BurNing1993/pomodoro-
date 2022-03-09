import { ipcRenderer } from 'electron'

export const ipcEvent = {
  CLOSE: 'close',
  MINIMIZE: 'minimize',
  TOGGLE_DEVTOOLS: 'toggle_devtools',
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
