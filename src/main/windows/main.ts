import { BrowserWindow } from 'electron'
import * as path from 'path'
import { IS_DEV } from '../constants'
import { setTray } from '../tray'

let win: BrowserWindow = null!

export function create() {
  win = new BrowserWindow({
    width: 350,
    height: 460,
    resizable: false,
    show: false,
    frame: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.on('ready-to-show', () => {
    win.show()
  })
  if (IS_DEV) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.join(__dirname, '/renderer/index.html'))
  }
}

export function focus() {
  if (win.isMinimized()) win.restore()
  win.focus()
}

export function close(quit = false) {
  if (quit) {
    win.close()
  } else {
    // setTray()
    win.hide()
  }
}

export function toggleShow() {
  if (win.isVisible()) {
    win.hide()
  } else {
    win.show()
  }
}

export function show() {
  win.show()
}

export function minimize() {
  win.minimize()
}


export function toggleDevtools(){
  win.webContents.toggleDevTools()
}