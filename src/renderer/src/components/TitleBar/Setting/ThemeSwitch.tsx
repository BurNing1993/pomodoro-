import React, { memo, useEffect, useState } from 'react'
import { Switch } from 'antd'
import { Theme, getLocalTheme, setLocalTheme } from '../../../utils/theme'

const ThemeSwitch: React.FC = () => {
  const [theme, setTheme] = useState(getLocalTheme())
  const onThemeChange = (checked: boolean) => {
    const t: Theme = checked ? 'DARK' : 'LIGHT'
    setTheme(t)
  }

  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])

  return (
    <Switch
      checkedChildren="🌙"
      unCheckedChildren="☀️"
      defaultChecked={theme === 'DARK'}
      onChange={onThemeChange}
    />
  )
}

export default memo(ThemeSwitch)