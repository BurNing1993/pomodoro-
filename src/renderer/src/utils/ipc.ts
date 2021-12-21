const electron = window.require('electron')
import { MainEvents } from '../../../common/ipcEvents';
import { Theme } from '../../../common/types';

/** @type import("electron").ipcRenderer */
const ipcRenderer = electron.ipcRenderer

export function toggleDevtools() {
    ipcRenderer.invoke(MainEvents.TOGGLE_DEVTOOLS)
}

export function closeWindow(quit = false) {
    ipcRenderer.invoke(MainEvents.CLOSE_WINDOW, quit)
}

export function minimizeWindow() {
    ipcRenderer.invoke(MainEvents.MINIMIZE_WINDOW)
}

export function changeDarkMode(theme: Theme) {
    ipcRenderer.invoke(MainEvents.CHANGE_DARK_MODE, theme)
}