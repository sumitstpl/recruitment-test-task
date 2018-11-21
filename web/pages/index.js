/* @flow */

import * as React from 'react';
import { Flex } from '@rebass/grid/emotion';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from '../controls/link';
import { createMutation } from '../controls/relay';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

const PropertyUpsertLead = createMutation<PropertyUpsertMutation, {}>(graphql`
  mutation pagesUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        landSurface
        livingSurface
      }
    }
  }
`);

export default (props) => (
  <>
    <Head>
      <title>{'Home'}</title>
    </Head>
    <Flex justifyContent="center">
      <Paper
        css={{
          maxWidth: 960,
          marginTop: 16,
          marginBottom: 16,
          width: '100%',
          padding: 16,
        }}
      >
      <Link href={{ pathname: '/property' }}>
                <Button
                  to="/property"
                  color="primary"
                  variant="contained"
                  css={{ marginTop: 10, marginBottom: 10 }}
                >
                  Back To List
                </Button>
              </Link>
        <Typography variant="h6" css={{ marginBottom: 24 }}>
          Property
        </Typography>
        <PropertyUpsertLead>
          {({ mutate, mutating }) => (
            <Formik
              initialValues={{
                livingSurface: '',
                landSurface: '',
                numberOfRooms: '',
                numberOfParkings: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = { "property": values };
                mutate(formData)
                setTimeout(() => {
                  setSubmitting(false);
                  window.location='/property';
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                livingSurface: Yup.number().required('Required'),
                landSurface: Yup.number().required('Required'),
                numberOfRooms: Yup.number().required('Required'),
                numberOfParkings: Yup.number().integer().required('Required'),
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                <form onSubmit={handleSubmit}>
                    <Flex>
                      <FormControl
                        error={errors.livingSurface && touched.livingSurface}
                      >
                        <InputLabel htmlFor="livingSurface">Living Surface</InputLabel>
                        <Input
                          id="livingSurface"
                          value={values.livingSurface}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.livingSurface && touched.livingSurface &&
                          <FormHelperText id="livingSurface-text">
                            {errors.livingSurface}
                          </FormHelperText>
                        }
                      </FormControl>
                      <FormControl
                        error={errors.landSurface && touched.landSurface}
                      >
                        <InputLabel htmlFor="landSurface">Land Surface</InputLabel>
                        <Input
                          id="landSurface"
                          value={values.landSurface}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.landSurface && touched.landSurface &&
                          <FormHelperText id="landSurface-text">
                            {errors.landSurface}
                          </FormHelperText>
                        }
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl
                        error={errors.numberOfRooms && touched.numberOfRooms}
                      >
                        <InputLabel htmlFor="numberOfRooms">Number of rooms</InputLabel>
                        <Input
                          id="numberOfRooms"
                          value={values.numberOfRooms}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.numberOfRooms && touched.numberOfRooms &&
                          <FormHelperText id="numberOfRooms-text">
                            {errors.numberOfRooms}
                          </FormHelperText>
                        }
                      </FormControl>
                      <FormControl
                        error={errors.numberOfParkings && touched.numberOfParkings}
                      >
                        <InputLabel htmlFor="numberOfParkings">Number of parkings</InputLabel>
                        <Input
                          id="numberOfParkings"
                          value={values.numberOfParkings}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.numberOfParkings && touched.numberOfParkings &&
                          <FormHelperText id="numberOfParkings-text">
                            {errors.numberOfParkings}
                          </FormHelperText>
                        }
                      </FormControl>
                    </Flex>
                    <Button
                      onClick={handleSubmit}
                      color="primary"
                      variant="contained"
                      css={{ marginTop: 24 }}
                      type="submit"
                      style={{justifyContent: 'right'}}
                      disabled={isSubmitting}
                    > 
                      Save
                    </Button>
                  </form>
                );
              }}
            </Formik>
          )}
        </PropertyUpsertLead>
      </Paper>
    </Flex>
  </>
);
