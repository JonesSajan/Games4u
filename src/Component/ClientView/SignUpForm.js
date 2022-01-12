import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { postData} from "../FetchNodeServices";
import swal from "sweetalert";
import Header from "./Header";
import "./styles.css";
import {Error, Warning, WarningOutlined, WarningRounded, WarningTwoTone} from "@material-ui/icons";
let otpGenerator = require("otp-generator");

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(0.1, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  otpfield: {
    width: "38px",
    marginRight: "10px",
    paddingLeft: " 12px",
    height: "40px",
  },
  textStyles2: {
    color: "red",
    display: "flex",
    fontSize: 10,
    fontFamily: 'Georgia,Times,"Times New Roman", serif',
    justifyContent: "center"
  },
}));

export default function MobileRegistration(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [rent, setRent] = useState(true);
  const [fNameMsg, setFNameMsg] = useState("");
  const [lNameMsg, setLNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [cnfPassMsg, setCnfPassMsg] = useState("");
  const [mobileMsg, setMobileMsg] =useState("");
  const [otpMsg, setOtpMsg] = useState("");
  let dispatch=useDispatch();
  const [mobileNumber, setMobileNumber] = useState(
    props.history.location.state.mobileno
  );
  const [otp, setOtp] = useState("");
  const [getOtpInput, setOtpInput] = useState("");
  const [drawer, setDrawer] = useState(false);

  const prePage = props.history.location.state.page;
  const item = props.history.location.state.product;
  const listItem = props.history.location.state.listItem;

  const turnRentOn=()=> setRent(true);
  const turnPlayOn=()=> setRent(false);

  const openDrawer=()=> {
    setDrawer(!drawer);
  }

  const otpGeneratorFn = () => {
    let otp = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });
    alert(otp);
    setOtp(otp);
  };

  const handleSubmit = async () => {
    if (!firstName.length)
      setFNameMsg("Please enter your firstname");
    if (!lastName.length)
      setLNameMsg("Please enter your lastname");
    if (!emailId.length)
      setEmailMsg("Please enter your email address");
    if (!mobileNumber.length)
      setMobileMsg("Please enter your mobile number");
    if (!password.length)
      setPassMsg("Please choose a password");
    if (!cnfPassword)
      setCnfPassMsg("Please confirm your password");
    if (otp !== getOtpInput) {
      setOtpMsg("INVALID_OTP");
      if (!getOtpInput.length)
        setOtpMsg("Please enter OTP");
    }

    else {
      let body = {
        emailid: emailId,
        mobileno: mobileNumber,
        firstname: firstName,
        lastname: lastName,
        password: password,
      }
      let result = await postData("userdetail/insertuserdetails", body);
      if (result.result) {

        let body = {mobileno: mobileNumber};
        let res = await postData("userdetail/checkusermobilenumber", body);

        if (res.result) {
          dispatch({
            type: "ADD_USER",
            payload: [res.data.mobileno, res.data],
          });
          props.history.push({'pathname': prePage}, {"product": item, "listItem": listItem});

        }

      } else {
        swal({
          title: "Registration Fail",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  }

  const handleInput = (field, value) => {
    if (field === "fName") {
      setFirstName(value);
      if (value === "")
        setFNameMsg("Please enter your firstname");
      else
        setFNameMsg("")
    }
    else if (field === "lName") {
      setLastName(value);
      if (value === "")
        setLNameMsg("Please enter your lastname");
      else
        setLNameMsg("");
    }

    else if (field === "email") {
      setEmailId(value);
      if (value === "")
        setEmailMsg("Please enter your email address");
      else
        setEmailMsg("")
    }

    else if (field === "password") {
      setPassword(value);
      if (value === "")
        setPassMsg("Please choose your password");
      else
        setPassMsg("")
    }

    else if (field === "cnfPassword") {
      setCnfPassword(value);
      if (value === "")
        setCnfPassMsg("Please re-enter your password");
      else
        setCnfPassMsg("")
    }

    else if (field === "otp") {
      setOtpInput(value);
      if (value === "")
        setOtpMsg("Please enter OTP");
      else
        setOtpMsg("")
    }

  }

  const checkMobileNumber = (value) => {
    setMobileNumber(value);
    if (value.slice(0, 1) < 6 )
      setMobileMsg("INVALID_MOBILE_NUMBER");
    if (value.length === 10)
      setMobileMsg("");
  }


  useEffect(function () {
    otpGeneratorFn();
  }, []);

  const showOtp = () => {
    const Completionist = () => <span style={{ color: "red" }}>Times Up!</span>;
    //let state = { otp: '' };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <h4>{`Otp sent on mobile +91${mobileNumber}`}</h4>
        <OtpInput
          value={getOtpInput}
          onChange={(value) => handleInput("otp", value)}
          inputStyle="inputStyle"
          numInputs={4}
          separator={<span>-</span>}
        />
        <div style={{ flexDirection: "column", margin: 5 }}>
          {otp !== getOtpInput
              ?
              <div className={classes.textStyles2}>
                *{otpMsg}
              </div>
              :
              ""
          }
          <div>waiting for otp</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Countdown date={Date.now() + 20000}>
              <Completionist />
            </Countdown>
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            color={"#000"}
            style={{background:'#1e6b7b',color:'#FFF',width:350}}
            startIcon={<VerifiedUserIcon />}
            onClick={() => handleSubmit()}
          >
            Verify
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header turnRentOn={turnRentOn} turnPlayOn={turnPlayOn} rent={rent} sendData={openDrawer} history={props.history} />
      {!drawer ? <div style={{ padding: 20 }}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <img alt={""}
                src="/registrationlogo.png"
                style={{ width: 60, margin: 25 }}
              />

              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Typography component="h4">Please enter your details</Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      onChange={(event) => handleInput("fName", event.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                    {fNameMsg !== ""
                        ?
                        <div className={classes.textStyles2}>
                          *{fNameMsg}
                        </div>
                        :
                        ""
                    }
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      onChange={(event) => handleInput("lName", event.target.value)}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                    {lNameMsg !== ""
                        ?
                        <div className={classes.textStyles2}>
                          *{lNameMsg}
                        </div>
                        :
                        ""
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      onChange={(event) => handleInput("email", event.target.value)}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    {emailMsg !== ""
                        ?
                        <div className={classes.textStyles2}>
                          *{emailMsg}
                        </div>
                        :
                        ""
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={mobileNumber}
                      onChange={(event) => checkMobileNumber(event.target.value)}
                      required
                      fullWidth
                      id="mobilenumber"
                      label="Enter Your Mobiile Number"
                      name="mobilenumber"
                      autoComplete="mobilenumber"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            +91 |{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                    {mobileMsg !== ""
                        ?
                        <div className={classes.textStyles2}>
                          *{mobileMsg}
                        </div>
                        :
                        ""
                    }
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={(event) => handleInput("password", event.target.value)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {passMsg !== ""
                        ?
                        <div className={classes.textStyles2}>
                          *{passMsg}
                        </div>
                        :
                        ""
                    }
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      onChange={(event) => handleInput("cnfPassword", event.target.value)}
                      fullWidth
                      name="rpassword"
                      label="Re Enter Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {cnfPassMsg !== ""
                        ?
                        <div className={classes.textStyles2}>
                          *{cnfPassMsg}
                        </div>
                        :
                        ""
                    }
                  </Grid>
                </Grid>
                {showOtp()}

              </form>
            </div>
          </Grid>
        </Grid>
      </div> : <></>}
    </div>
  );
}
