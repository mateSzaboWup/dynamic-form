import * as yup from 'yup'

export const FormTypes = ['text', 'checkbox', 'select', 'radio']

export const ValidationTypes = [
  'required',
  'min',
  'max',
  'maxLength',
  'minLength',
  'pattern',
]

export const formSchema = yup.object({
  type: yup.string().oneOf(FormTypes).required(),
  name: yup.string().required(),
  label: yup.string().required(),
  placeholder: yup.string().optional(),
  options: yup
    .array(
      yup.object({
        value: yup.string().required(),
        label: yup.string().optional(),
      })
    )
    .optional(),
  defaultValue: yup.mixed().when('type', (type, schema) => {
    switch (type) {
      case 'checkbox':
        schema = yup.boolean().optional()
        break
      default:
        schema = yup.string().optional()
        break
    }
    return schema
  }),
  validations: yup
    .array(
      yup.object({
        type: yup.string().oneOf(ValidationTypes).required(),
        message: yup.string().required(),
        value: yup.mixed().when('type', (type, schema) => {
          switch (type) {
            case 'required':
              schema = yup.boolean().required()
              break
            case 'pattern':
              schema = yup.string().required()
              break
            default:
              schema = yup.number().required()
              break
          }
          return schema
        }),
      })
    )
    .optional(),
  breakPoints: yup
    .object({
      xs: yup.number().min(0).max(12).optional(),
      sm: yup.number().min(0).max(12).optional(),
    })
    .default(undefined),
})

export type FormType = yup.InferType<typeof formSchema>
export const formSchemaArray = yup.array(formSchema).required()
