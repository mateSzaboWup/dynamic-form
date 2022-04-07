import React, { useMemo } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Controller, useForm } from 'react-hook-form'
import { FormType } from '../../models/FormType'
import DynamicFormInput from './DynamicFormInput'
import Stack from '@mui/material/Stack'

type Props = {
  formStructures: FormType[]
  //onSubmit: () => void
}

const DynamicForm = ({ formStructures }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const formInputs = useMemo(
    () =>
      formStructures.map(formStructure => {
        const { name, validations, defaultValue, breakPoints } = formStructure

        const rules = validations?.reduce(
          (a, { type, value, message }) => ({
            ...a,
            [type]: { value, message },
          }),
          {}
        )

        return (
          <Grid
            key={`${name}-grid`}
            item
            xs={breakPoints?.xs}
            md={breakPoints?.sm}
          >
            <Controller
              name={name}
              control={control}
              rules={rules}
              defaultValue={defaultValue}
              render={({ field }) => (
                <DynamicFormInput
                  value={field.value}
                  onChange={field.onChange}
                  formStructure={formStructure}
                  errors={errors[name]}
                />
              )}
            />
          </Grid>
        )
      }),
    [formStructures, control, errors]
  )

  const onSubmit = (data: any) => console.log(data)

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" spacing={2}>
          {formInputs}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center">
              <Button variant="contained" type="submit" size="large">
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default DynamicForm
