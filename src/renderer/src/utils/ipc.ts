const electron = window.require('electron')
import { MainEvents } from '../../../common/ipcEvents';

/** @type import("electron").ipcRenderer */
const ipcRenderer = electron.ipcRenderer

export function toggleDevtools() {
    ipcRenderer.invoke(MainEvents.TOGGLE_DEVTOOLS)
}

export function closeWindow(){
    ipcRenderer.invoke(MainEvents.CLOSE_WINDOW)
}
export function minimizeWindow(){
    ipcRenderer.invoke(MainEvents.MINIMIZE_WINDOW)
}