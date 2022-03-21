import { setNativeTheme } from './ipc'

export type Theme = 'LIGHT' | 'DARK'

const LOCAL_THEME = 'local_theme'

export function getLocalTheme(): Theme {
  if (
    localStorage[LOCAL_THEME] === 'DARK' ||
    (!(LOCAL_THEME in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return 'DARK'
  }
  return 'LIGHT'
}

export function setLocalTheme(theme: Theme) {
  localStorage.setItem(LOCAL_THEME, theme)
  setNativeTheme(theme)
  let darkStyleLink = document.querySelector('#theme') as HTMLLinkElement
  if (!darkStyleLink) {
    darkStyleLink = document.createElement('link')
    darkStyleLink.id = 'theme'
  }
  if (theme === 'DARK') {
    darkStyleLink.href = process.env.PUBLIC_URL + '/antd.dark.min.css'
    document.documentElement.classList.add('dark')
  } else {
    darkStyleLink.href = ''
    document.documentElement.classList.remove('dark')
  }
}
