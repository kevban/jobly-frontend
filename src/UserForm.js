import { Button, Card, Container, TextField, Alert } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import JoblyApi from './api';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext'



const UserForm = ({ type, login }) => {


    const { user, setUser } = useContext(UserContext);
    const [formType, setFormType] = useState({
        initialValues: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const signupValidationSchema = yup.object({
            username: yup
                .string('Enter your username')
                .min(1, 'Username must be between 1-30 characters')
                .max(30, 'Username must be between 1-30 characters')
                .required('Password is required'),

            password: yup
                .string('Enter your password')
                .min(5, 'password must be between 5-20 characters')
                .max(20, 'password must be between 5-20 characters')
                .required('Password is required'),
            firstName: yup
                .string('Enter your first name')
                .min(1, 'First name must be between 1-30 characters')
                .max(30, 'First name must be between 1-30 characters')
                .required('Password is required'),

            lastName: yup
                .string('Enter your last name')
                .min(1, 'Last name must be between 1-30 characters')
                .max(30, 'Last name must be between 1-30 characters')
                .required('Password is required'),

            email: yup
                .string('Enter your email')
        })

        const loginValidationSchema = yup.object({
            username: yup
                .string('Enter your username')
                .min(1, 'Username must be between 1-30 characters')
                .max(30, 'Username must be between 1-30 characters')
                .required('Password is required'),

            password: yup
                .string('Enter your password')
                .min(5, 'password must be between 5-20 characters')
                .max(20, 'password must be between 5-20 characters')
                .required('Password is required')
        })

        const patchValidationSchema = yup.object({
            username: yup
                .string('Enter your username')
                .min(1, 'Username must be between 1-30 characters')
                .max(30, 'Username must be between 1-30 characters')
                .required('Password is required'),

            password: yup
                .string('Enter your password')
                .min(5, 'password must be between 5-20 characters')
                .max(20, 'password must be between 5-20 characters')
                .required('Password is required'),
            firstName: yup
                .string('Enter your first name')
                .min(1, 'First name must be between 1-30 characters')
                .max(30, 'First name must be between 1-30 characters')
                .required('Password is required'),

            lastName: yup
                .string('Enter your last name')
                .min(1, 'Last name must be between 1-30 characters')
                .max(30, 'Last name must be between 1-30 characters')
                .required('Password is required'),

            email: yup
                .string('Enter your email')
        })

        if (type === 'signup') {
            setFormType({
                schema: signupValidationSchema,
                title: 'Sign up',
                initialValues: {
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: ''
                }})
    } else if (type === 'login') {
        formik.initialValues = {
            username: '',
            password: ''
        }
        setFormType({
            schema: loginValidationSchema,
            title: 'Log in'
        })
    } else {
        if (user && user.username) {
            setFormType({
                schema: patchValidationSchema,
                title: 'Update info'
            })
            formik.resetForm({
                values: user,
              });
        } else {
            navigate('/signup')
        }
    }
    
}, [type])

const handleSubmit = async (values) => {
    let data = {}
    let res
    console.log('hi')
    try {
        if (type === 'signup') {
            data = values
            res = await JoblyApi.register(data)
        } else if (type === 'login') {
            data = {
                username: values.username,
                password: values.password
            }
            res = await JoblyApi.login(data)
        } else {
            data = {
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
                email: values.email,
            }
            res = await JoblyApi.editProfile(data, user.username)
        }

        if (type === 'patch') {
            setUser((data) => ({
                ...data,
                res
            }))
            navigate('/profile');
        } else {
            login(res)
            navigate('/');
        }
    } catch (e) {
        setMessage(e[0], 'error')
    }
}

const [alert, setAlert] = useState(null);

const setMessage = (msg, type) => {
    setAlert(<Alert severity={type}>{msg}</Alert>)
}

const formik = useFormik({
    initialValues: formType.initialValues,
    validationSchema: formType.schema,
    onSubmit: handleSubmit,
})


return (
    <Container sx={{ mx: 'auto', maxWidth: 600, p: 3 }}>
        {alert}
        <h2>{formType.title}</h2>
        <Card sx={{ p: 2 }}>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label='Username'
                        inputProps={type === 'patch' ? {
                            readOnly: true
                        } : {}}
                        required
                        value={formik.values.username || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        name='username'>
                    </TextField>
                    <TextField
                        label={type === 'patch' ? 'New Password' : 'Password'}
                        type={'password'}
                        name='password'
                        required
                        value={formik.values.password || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}>
                    </TextField>
                    {type !== 'login' ?
                        <>
                            <TextField
                                label='First Name'
                                name='firstName'
                                required
                                value={formik.values.firstName || ''}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}>
                            </TextField>
                            <TextField
                                label='Last Name'
                                name='lastName'
                                required
                                value={formik.values.lastName || ''}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}>
                            </TextField>
                            <TextField
                                type='email'
                                name='email'
                                required
                                label='Email'
                                value={formik.values.email || ''}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}>
                            </TextField>
                        </> : null}
                    <Button type="submit" variant='contained' >Submit</Button>
                </Stack>
            </form>
        </Card>
    </Container>)
}

export default UserForm