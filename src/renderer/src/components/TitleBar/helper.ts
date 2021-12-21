import { CloseAction } from "./CloseDialog"
import { Theme } from '../../../../common/types'

const REMEMBER = 'remember'

export function getLocalRemember() {
    return localStorage[REMEMBER] === 'true'
}

export function setLocalRemember(remember: boolean) {
    localStorage[REMEMBER] = String(remember)
}

const CLOSE_ACTION = 'CloseAction'

export function getLocalCloseAction(): CloseAction {
    const val = localStorage[CLOSE_ACTION]
    if (val === 'close') {
        return 'close'
    }
    return 'hide'
}

export function setLocalCloseAction(action: CloseAction) {
    localStorage[CLOSE_ACTION] = action
}

const THEME  = 'theme'

export function getLocalTheme():Theme {
    if (localStorage[THEME] === 'dark' || (!(THEME in localStorage) && window.matchMedia('(prefers-color-scheme: dark)'))) {
        return 'dark'
    }
    return 'light'
}

//  window.matchMedia('(prefers-color-scheme: dark)').matches