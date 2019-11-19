import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';

export default function Register(props) {
  const [user, setUser] = useState({displayName: '', email: '', password: ''});
  // const [isRegistering, setMode] = useState(true);
  

  const handleInputChange = e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  const registerUser = () => {
    // setMode(true)
    props.registerUser(user)
  }

  const formDisabled = () => {
    const { displayName, email, password} = user;
    return(
      (!displayName || displayName.length === 0) ||
      (!email || email.length === 0)||
      (!password || password.length === 0)) ? true : false;
  }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog className="reg" open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div style={{ textAlign: "center"}}>
            <Typography variant={"h4"}>Register</Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Display Name"
                margin="normal"
                variant="outlined"
                name="displayName"
                onChange={handleInputChange}
                value={user.displayName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-uncontrolled"
                label="Email"
                margin="normal"
                variant="outlined"
                type="email"
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
                style={{ width: '100%', height: "55px", marginTop: "20px", marginBottom: "20px"}}
                variant="contained"
                size="large"
                color="primary"
                onClick={registerUser}
                // disabled={formDisabled}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}