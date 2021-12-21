import React, { memo, useState } from 'react'
import { Drawer, SettingItem } from './style'
import Tabs, { TabPane } from 'rc-tabs'
import Switch from 'rc-switch'
import {Theme} from '../../../../common/types'
import { getLocalTheme } from './helper'
import { changeDarkMode } from '../../utils/ipc'

interface Props {
  open: boolean
  onClose: () => void
}

const Setting: React.FC<Props> = ({ open, onClose }) => {
  const [theme, setTheme] = useState<Theme>(getLocalTheme())
  const onThemeChange = (checked:boolean) => {
    const theme:Theme = checked ?'dark':'light'
    setTheme(theme)
    changeDarkMode(theme)
  }
  return (
    <Drawer
      style={{
        transform: open ? 'none' : 'translateY(100%)',
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="通用" key="1">
          <SettingItem>
            <label htmlFor="theme">主题</label>
            <Switch
              id="theme"
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={theme === 'dark'}
              onChange={onThemeChange}
            />
          </SettingItem>
        </TabPane>
        <TabPane tab="关于" key="2">
          关于
        </TabPane>
      </Tabs>
    </Drawer>
  )
}

export default memo(Setting)
