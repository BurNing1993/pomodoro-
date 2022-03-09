import React, { memo } from 'react'
import { Form, Radio, Switch } from 'antd'
import { useRecoilState } from 'recoil'
import ThemeSwitch from './ThemeSwitch'
import { settingState } from '../../../store/atoms'

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

const CommonSetting: React.FC = () => {
  const [form] = Form.useForm()
  const [setting, setSetting] = useRecoilState(settingState)
  const onValuesChange = (changedValues: any, allValues: any) => {
    setSetting((c) => ({ ...c, ...changedValues }))
  }
  return (
    <div className="p-2">
      <Form
        {...layout}
        form={form}
        layout="horizontal"
        initialValues={setting}
        onValuesChange={onValuesChange}
        labelAlign="right"
        className="text-right setting-form"
      >
        <Form.Item label="主题">
          <ThemeSwitch />
        </Form.Item>
        <Form.Item name="autoStart" label="自动开始计时" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="closeAction" label="关闭主面板">
          <Radio.Group>
            <Radio value="CLOSE">关闭</Radio>
            <Radio value="TRAY">最小化</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  )
}

export default memo(CommonSetting)
