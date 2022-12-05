import { ipcMain, nativeImage, nativeTheme } from 'electron'
import { setTrayIcon } from './tray'
import {
  close as closeMainWindow,
  minimize as minimizeMainWindow,
  toggleDevtools as toggleMainDevtools,
  send as sendToMain,
} from './windows/main'

export type Theme = 'LIGHT' | 'DARK'

export const ipcEvent = {
  CLOSE: 'close',
  MINIMIZE: 'minimize',
  TOGGLE_DEVTOOLS: 'toggle_devtools',
  SET_THEME: 'set_theme',
  UPDATE_TRAY_ICON: 'update_tray_icon',
  GET_ITCH_API: 'get_itch_api',
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
  ipcMain.handle(ipcEvent.SET_THEME, (e, theme?: Theme) => {
    if (theme) {
      nativeTheme.themeSource = theme === 'DARK' ? 'dark' : 'light'
    } else {
      nativeTheme.themeSource = 'system'
    }
  })

  ipcMain.handle(ipcEvent.GET_ITCH_API, () => {
    const ITCHIO_API_KEY = process.env.ITCHIO_API_KEY
    sendToMain('itch_api', ITCHIO_API_KEY)
  })
}
