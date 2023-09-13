import { TextField, Grid, Typography, Button, Alert } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Container from "@mui/material/Container/Container";
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      role:"",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      role:Yup.string().required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        setAuth({...values})
        localStorage.setItem("user", JSON.stringify({...values}))
        formik.resetForm()
        navigate('/dashboard')
      } catch (e) {
        console.log(e)
      }
    },
  })

  return (
    <Container style={{ marginTop: '40px' }}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={1}></Grid>
        <Grid item sm={6} xs={10}>
          <form style={{ marginBottom: '15px' }} onSubmit={formik.handleSubmit}>
            <Typography variant="h3" component="h3" sx={{ mb: 5 }} >
              Login
            </Typography>
            <Alert severity="info" sx={{ my: 5 }}>Use any username & password</Alert>

            {/*Input Fields*/}
            <TextField
              name="email"
              label="Email"
              onChange={formik.handleChange}
              variant="outlined"
              type="email"
              sx={{ mb: 3 }}
              fullWidth
              value={formik.values.email}
              error={formik.errors.email ? true : false}
              helperText={formik.errors.email}
            />
            <TextField
              name="password"
              label="Password"
              onChange={formik.handleChange}
              variant="outlined"
              type="password"
              fullWidth
              value={formik.values.password}
              error={formik.errors.password ? true : false}
              helperText={formik.errors.password}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth>
              <InputLabel label="Role" error={formik.errors.role? true: false } >Role</InputLabel>
              <Select
                name="role"
                label="Role"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.role}
                error={formik.errors.role ? true : false}
                sx={{ mb: 3 }}
              >
                {["admin","user"].map((role,key)=>{
                  return <MenuItem key={key} value={role}>{role.toUpperCase()}</MenuItem>
                })}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">Login</Button>
          </form>
        </Grid>
        <Grid item sm={3} xs={1}></Grid>
      </Grid>
    </Container>
  );
}
