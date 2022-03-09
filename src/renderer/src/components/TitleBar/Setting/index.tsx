import React, { memo, useState } from 'react'
import { Drawer, Tabs } from 'antd'
import {
  ClockCircleOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import Timer from './Timer'
import CommonSetting from './CommonSetting'
import About from './About'

const { TabPane } = Tabs

const Setting: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <div
        className="w-16 h-8  py-[10px] flex flex-col justify-between items-center cursor-pointer hover:bg-s-500"
        onClick={() => setVisible((v) => !v)}
      >
        <div
          className={`w-[15px] h-[2px] bg-black dark:bg-white transition-transform ${
            visible && '-rotate-45'
          }`}
        ></div>
        <div
          className={`w-[15px] h-[2px] bg-black dark:bg-white transition-transform ${
            visible && 'rotate-45'
          }`}
        ></div>
      </div>
      <Drawer
        placement="bottom"
        onClose={() => setVisible(false)}
        visible={visible}
        closable={false}
        mask={false}
        height="calc(100vh - 32px)"
        className="setting-drawer"
      >
        <Tabs defaultActiveKey="timer" centered size="small">
          <TabPane
            tab={
              <span className="flex items-center justify-center">
                <ClockCircleOutlined />
                <span>计时器</span>
              </span>
            }
            key="timer"
          >
            <Timer />
          </TabPane>
          <TabPane
            tab={
              <span className="flex items-center justify-center">
                <SettingOutlined />
                <span>通用</span>
              </span>
            }
            key="common"
          >
            <CommonSetting />
          </TabPane>
          <TabPane
            tab={
              <span className="flex items-center justify-center">
                <InfoCircleOutlined />
                <span>关于</span>
              </span>
            }
            key="about"
          >
            <About />
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  )
}

export default memo(Setting)
