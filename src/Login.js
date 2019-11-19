import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';

export default function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' });


  const handleInputChange = e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  const loginUser = e => {
    props.loginUser(user)
  }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div style={{ textAlign: "center"}}>
            <Typography variant={"h4"}>Login</Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Email"
                margin="normal"
                variant="outlined"
                name="email"
                onChange={handleInputChange}
                value={user.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-uncontrolled"
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
                name="password"
                onChange={handleInputChange}
                value={user.password}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className="login-button">
              <Button
                style={{ width: '100%', height: "55px", marginTop: "20px", marginBottom: "20px" }}
                variant="contained"
                size="large"
                color="primary"
                onClick={loginUser}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}