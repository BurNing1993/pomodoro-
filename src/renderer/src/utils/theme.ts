export type Theme = 'LIGHT' | 'DARK'

const LOCAL_THEME = 'local_theme'

export function getLocalTheme(): Theme {
  if (
    localStorage[LOCAL_THEME] === 'dark' ||
    (!(LOCAL_THEME in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)'))
  ) {
    return 'DARK'
  }
  return 'LIGHT'
}

export function setLocalTheme(theme: Theme) {
  localStorage.setItem(LOCAL_THEME, theme)
  // TODO ipc
}
