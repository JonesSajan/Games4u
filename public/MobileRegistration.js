import React, { useState, Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import ReactDOM from "react-dom";
import OtpInput from 'react-otp-input';
import Countdown from "react-countdown";
import { FormatSize } from '@material-ui/icons';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    otpfield: {
        width: "38px",
        marginRight: '10px',
        paddingLeft: ' 12px',
        height: '40px'
    }

}));

export default function MobileRegistration() {
    const classes = useStyles();
    const [state, setState] = useState('')

    const [showbox, setshowbox] = useState(false)
    //const handleChange = (otp) => this.setState({ otp });

    const showOtp = () => {
        const Completionist = () => <span style={{ color: 'red', }}>Times Up!</span>;
        //var state = { otp: '' };

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <OtpInput
                    //value={this.state.otp}
                    //onChange={()=>handleChange()}

                    numInputs={4}
                    separator={<span >-</span>}
                />
                <div style={{flexDirection:'column',margin:5}}>
                    <div>
                    waiting for otp
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Countdown date={Date.now() + 20000}>
                        <Completionist />
                    </Countdown>
                    </div>
                </div>
                <div style={{margin:30}}><Button
        variant="contained"
        color={'#000'}
        //className={classes.button}
        startIcon={<VerifiedUserIcon />}
      >
        Verify
      </Button></div>
            </div>

        )

    }

    const otpButton = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img onClick={() => setshowbox(!showbox)} src="/otp.png" style={{ width: 50, height: 50, margin: 30 }} />
            </div>
        )

    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>

                    <img src='/registrationlogo.png' style={{ width: 60, margin: 25 }} />

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div style={{ display: 'flex', margin: 20 }}>Sign in to access your Orders, Offers, Wishlist.</div>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            width={14}
                            id="mobilenumber"
                            label="Enter Your Mobiile Number"
                            name="mobilenumber"
                            autoComplete="mobilenumber"
                            autoFocus
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+91 | </InputAdornment>,
                            }}
                        />

                        <div>{otpButton()}</div>
                        {showbox ? showOtp() : <></>}

                        

                    </form>
                </div>
            </Grid>
        </Grid>
    );
}