import React from 'react'
import TextField from '@mui/material/TextField'
import { FormType } from '../../models/FormType'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'

type Props = {
  formStructure: FormType
  onChange: (value: any) => void
  value: any
  errors: any
}

const DynamicFormInput = ({
  formStructure,
  onChange,
  value,
  errors,
}: Props) => {
  switch (formStructure.type) {
    case 'text':
      return (
        <TextField
          error={errors != null}
          margin="normal"
          fullWidth
          placeholder={formStructure.placeholder}
          onChange={({ target }) => onChange(target.value)}
          value={value}
          label={formStructure.label}
          helperText={errors != null ? errors.message : ''}
        />
      )
    case 'radio':
      return (
        <FormControl fullWidth margin="normal" error={errors != null}>
          <FormLabel id={formStructure.name}>{formStructure.label}</FormLabel>
          <RadioGroup
            name={formStructure.name}
            value={value}
            onChange={(_, value) => onChange(value)}
          >
            {formStructure?.options?.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
          <FormHelperText error>
            {errors != null ? errors.message : ''}
          </FormHelperText>
        </FormControl>
      )
    case 'select':
      return (
        <FormControl fullWidth margin="normal" error={errors != null}>
          <InputLabel id={`${formStructure.name}-label`}>
            {formStructure.label}
          </InputLabel>
          <Select
            labelId={`${formStructure.name}-label`}
            id={formStructure.name}
            value={value}
            label={formStructure.label}
            onChange={({ target }) => onChange(target.value)}
          >
            {formStructure?.options?.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {errors != null ? errors.message : ''}
          </FormHelperText>
        </FormControl>
      )

    case 'checkbox':
      return (
        <FormControl fullWidth margin="normal" error={errors != null}>
          <FormControlLabel
            sx={{ width: '100%' }}
            value={value ?? false}
            onChange={(_, checked) => onChange(checked)}
            control={<Checkbox />}
            label={formStructure.label}
          />
          <FormHelperText error>
            {errors != null ? errors.message : ''}
          </FormHelperText>
        </FormControl>
      )

    default:
      return null
  }
}
export default DynamicFormInput
