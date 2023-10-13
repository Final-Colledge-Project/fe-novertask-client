// src/form-component/FormInputText.tsx
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import * as React from 'react'
import './style.scss'

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  children: React.ReactElement
}

const WithController = <T extends FieldValues>({
  name,
  control,
  children
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="input-item">
          {React.cloneElement(children, {
            field,
            error: !!fieldState.error,
            onChange: field.onChange,
            value: field.value
          })}
          {fieldState.error && (
            <p className="error-message">{fieldState.error?.message}</p>
          )}
        </div>
      )}
    />
  )
}
export default WithController
