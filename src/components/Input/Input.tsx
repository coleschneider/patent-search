import React from 'react'

interface InputContainerProps {
  children: any
  label?: string
  input: ReturnType<typeof useInput>
}

function InputContainer({ children, label, input }: InputContainerProps) {
  return (
    <div>
      <div>
        {label && <label htmlFor="">{label}</label>}
        {children}
      </div>
      {input.touched && input.errors && input.errors.length > 0 && (
        <div>
          Error:{' '}
          {input.errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputContainer
