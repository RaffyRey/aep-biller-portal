import { TextField } from '@mui/material'
import React from 'react'

const FormInput = ({ inputLabel, inputValue, inputChange, inputName, inputType, inputId, inputAutoComplete }) => {
  return (
    <TextField type={inputType} id={inputId} label={inputLabel} multiline size='normal' color="warning" fullWidth margin="normal" value={inputValue} onChange={inputChange} name={inputName} autoComplete={inputAutoComplete} />
  )
}

export default FormInput