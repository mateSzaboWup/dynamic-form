import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import DynamicForm from './components/dumb/DynamicForm'
import { FormType, formSchemaArray } from './models/FormType'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'

const formStructures: FormType[] = [
  {
    label: 'Név',
    name: 'name',
    type: 'text',
    defaultValue: '',
    validations: [
      { type: 'required', value: true, message: 'Ez a mező kötelező' },
    ],
    breakPoints: { xs: 6, sm: undefined },
    options: undefined,
    placeholder: undefined,
  },
  {
    label: 'Neme',
    name: 'gender',
    type: 'select',
    options: [
      { value: 'man', label: 'Férfi' },
      { value: 'woman', label: 'Nő' },
    ],
    defaultValue: 'man',
    validations: [
      { type: 'required', value: true, message: 'Ez a mező kötelező' },
    ],
    breakPoints: { xs: 6, sm: undefined },
    placeholder: undefined,
  },
  {
    label: 'Vércsoport',
    name: 'blood',
    type: 'radio',
    options: [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ],
    defaultValue: 'a',
    validations: [
      { type: 'required', value: true, message: 'Ez a mező kötelező' },
    ],
    breakPoints: { xs: 6, sm: undefined },
    placeholder: undefined,
  },
  {
    label: 'Tudod?',
    name: 'ageCheck',
    type: 'checkbox',
    validations: [
      { type: 'required', value: true, message: 'Ez a mező kötelező' },
    ],
    breakPoints: { xs: 6, sm: undefined },
    options: undefined,
    placeholder: undefined,
    defaultValue: undefined,
  },
]

function App() {
  const [formJson, setFormJson] = useState(
    JSON.stringify(formStructures, null, 2)
  )

  const [errors, setErrors] = useState<string[]>([])

  const [parsedForm, setParsedForm] = useState<FormType[]>([])

  useEffect(() => {
    try {
      JSON.parse(formJson)
      formSchemaArray
        .validate(formJson)
        .then(result => {
          setParsedForm(result)
          setErrors([])
        })
        .catch(err => setErrors(err?.errors ?? ['Not valid JSON.']))
    } catch (err: any) {
      setErrors(['Not valid JSON.'])
    }
  }, [formJson, setErrors, setParsedForm])

  return (
    <Container>
      <Paper>
        <Stack mt={4} direction="row">
          <Box sx={{ width: '50%' }}>
            <TextField
              label="Form Json"
              multiline
              rows={30}
              variant="filled"
              fullWidth
              value={formJson}
              onChange={({ target }) => setFormJson(target.value)}
            />
          </Box>
          <Box sx={{ width: '50%' }}>
            {errors && errors.length > 0 ? (
              <>
                {errors.map(error => (
                  <Typography key={error} variant="h3">
                    {error}
                  </Typography>
                ))}
              </>
            ) : (
              <DynamicForm formStructures={parsedForm} />
            )}
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
}

export default App
