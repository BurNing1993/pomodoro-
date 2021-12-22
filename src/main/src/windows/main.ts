import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { ROOT } from '../../../common/constant'

let win: BrowserWindow | null = null

export function create() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 400,
    minHeight:600,
    show: false,
    frame: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.on('ready-to-show', () => {
    win?.show()
  })
  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.join(ROOT, 'dist/renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
}

export function show() {
  win?.show()
}

export function toggleShow() {
  if (win?.isVisible()) {
    win?.hide()
  } else {
    win?.show()
  }
}

export function toggleDevtools() {
  win?.webContents.toggleDevTools()
}

export function close(quit = false) {
  if (quit) {
    app.quit()
  } else {
    win?.hide()
  }
}

export function minimize() {
  win?.minimize()
}