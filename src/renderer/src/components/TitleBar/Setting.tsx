import React, { memo, useEffect, useState } from 'react'
import { Drawer, RadioContainer, SettingItem } from './style'
import Tabs, { TabPane } from 'rc-tabs'
import Switch from 'rc-switch'
import { Theme } from '../../../../common/types'
import {
  getLocalCloseAction,
  getLocalTheme,
  setLocalCloseAction,
} from './helper'
import { changeDarkMode } from '../../utils/ipc'
import About from './About'
import { CloseAction } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
}

const Setting: React.FC<Props> = ({ open, onClose }) => {
  const [theme, setTheme] = useState<Theme>(getLocalTheme())
  const [action, setAction] = useState<CloseAction>(getLocalCloseAction())
  const onThemeChange = (checked: boolean) => {
    const theme: Theme = checked ? 'dark' : 'light'
    setTheme(theme)
    changeDarkMode(theme)
  }

  useEffect(() => {
    setLocalCloseAction(action)
  }, [action])

  return (
    <Drawer
      style={{
        transform: open ? 'none' : 'translateY(100%)',
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Timer" key="1">
          Timer
        </TabPane>
        <TabPane tab="通用" key="2">
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
          <SettingItem>
            <label style={{ paddingTop: '2px' }}>关闭主面板</label>
            <RadioContainer>
              <div>
                <input
                  type="radio"
                  id="hide"
                  name="close"
                  value="hide"
                  onChange={(e) =>
                    setAction(e.target.checked ? 'hide' : 'close')
                  }
                  checked={action === 'hide'}
                />
                <label htmlFor="hide">最小化到系统托盘</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="close"
                  name="close"
                  value="close"
                  onChange={(e) =>
                    setAction(e.target.checked ? 'close' : 'hide')
                  }
                  checked={action === 'close'}
                />
                <label htmlFor="close">关闭应用</label>
              </div>
            </RadioContainer>
          </SettingItem>
        </TabPane>
        <TabPane tab="关于" key="3">
          <About />
        </TabPane>
      </Tabs>
    </Drawer>
  )
}

export default memo(Setting)
