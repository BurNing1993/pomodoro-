import { ipcMain, nativeTheme } from "electron";
import { MainEvents } from "../../common/ipcEvents";
import { Theme } from "../../common/types";
import {
    toggleDevtools as toggleMainDevtools,
    close as closeMainWindow,
    minimize as minimizeMainWindow,
} from "./windows/main";

export default function handleIPC() {
    ipcMain.handle(MainEvents.TOGGLE_DEVTOOLS, () => {
        toggleMainDevtools()
    })
    // 关闭窗口
    ipcMain.handle(MainEvents.CLOSE_WINDOW, async (_, quit = false) => {
        closeMainWindow(quit)
    })

    ipcMain.handle(MainEvents.MINIMIZE_WINDOW, () => {
        minimizeMainWindow()
    })
    // dark mode
    ipcMain.handle(MainEvents.CHANGE_DARK_MODE, (_, theme: Theme) => {
        nativeTheme.themeSource = theme
        return nativeTheme.shouldUseDarkColors
    })
}