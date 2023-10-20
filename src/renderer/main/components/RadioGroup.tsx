import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  name: string
  registerProps: UseFormRegisterReturn<string>
  defalutValue?: string | number
}

const RadioGroup: React.FC<Props> = ({
  options,
  registerProps,
  defalutValue,
}) => {
  return (
    <div className="flex items-center gap-6">
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className="flex items-center gap-2"
        >
          <input
            {...registerProps}
            id={option.value}
            name="type"
            type="radio"
            className="radio"
            value={option.value}
            checked={option.value === defalutValue}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
