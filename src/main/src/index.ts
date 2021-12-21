import { app } from 'electron'
import { loadDevTools } from './dev'
import {
  create as createMainWindow,
  focus as focusMainWindow,
} from './windows/main'
import handleIPC from './ipc';
import setTray from './tray';

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    focusMainWindow()
  })
  app.whenReady().then(() => {
    createMainWindow()
    handleIPC()
    setTray()
    app.applicationMenu = null
  })
}

if (import.meta.env.DEV) {
  loadDevTools()
}

