import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service-local.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { getLabels } from '../services/toy.service-local.js'

export function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  const isOnline = useOnlineStatus()

  const labels = getLabels()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log('Had issues in toy edit', err)
        navigate('/toy')
      })
  }

  function onSaveToy(toyToSave) {
    saveToy(toyToSave)
      .then(() => {
        showSuccessMsg('Toy Saved!')
        navigate('/toy')
      })
      .catch((err) => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Had issues in toy details')
      })
  }

  const ToyEditSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Price must be at least 1'),
    inStock: Yup.boolean(),
    labels: Yup.array().of(Yup.string()),
  })

  return (
    <div>
      <section className="toy-edit">
        <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
        <Formik
          enableReinitialize
          initialValues={toyToEdit}
          validationSchema={ToyEditSchema}
          onSubmit={onSaveToy}
        >
          {({ errors, touched, values, isValid, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Name"
                variant="outlined"
                required
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                value={values.name}
              />

              <Field
                as={TextField}
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                required
                margin="normal"
                inputProps={{ min: 1 }}
                error={touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                value={values.price}
              />

              <FormControl
                margin="normal"
                style={{ minWidth: '20vw' }}
                variant="outlined"
              >
                <InputLabel id="labels-label">Labels</InputLabel>
                <Select
                  labelId="labels-label"
                  id="labels"
                  multiple
                  name="labels"
                  value={values.labels}
                  onChange={(ev) => {
                    setFieldValue('labels', ev.target.value)
                  }}
                  renderValue={(selected) => selected.join(', ')}
                  label="Labels"
                >
                  {labels.map((label) => (
                    <MenuItem key={label} value={label}>
                      <Checkbox checked={values.labels.includes(label)} />
                      <ListItemText primary={label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="inStock"
                    checked={values.inStock}
                  />
                }
                label="In Stock"
              />

              <Button variant="contained" type="submit" disabled={!isValid}>
                {toyToEdit._id ? 'Save' : 'Add'}
              </Button>
            </Form>
          )}
        </Formik>
      </section>
      <section>
        <h3>{isOnline ? '✅ Online' : '❌ Disconnected'}</h3>
      </section>
    </div>
  )
}
