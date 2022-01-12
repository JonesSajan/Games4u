import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import OtpInput from 'react-otp-input';
import Countdown from "react-countdown";
import {postData} from "../FetchNodeServices"
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import "./styles.css"
let otpGenerator = require('otp-generator')


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
    const [mobileNumber, setMobileNumber] = useState('');
    const [showbox, setshowbox] = useState(false);
    const [userData,setUserData]=useState(localStorage.getItem("userData"));
    const [otp,setOtp]=useState();
    const [getOtpInput, setOtpInput] = useState("");
    const [msg, setMsg] = useState("");
    const prePage = props.history.location.state.page;
    const item = props.history.location.state.item;
    const listItem = props.history.location.state.listItem;

    let dispatch=useDispatch()

    const addCart =async ()=> {
        let body = {mobileno: mobileNumber}
        let result = await postData("userdetail/checkusermobilenumber", body);

        if (result.data) {
            if (result.data.cart ? result.data.cart.length > 5 : false) {
                let cart = JSON.parse(result.data.cart);
                let keys = Object.keys(cart);
                for (let i=0; i<keys.length; i++) {
                    let item = cart[keys[i]];
                    let itemName = item.gamename ? item.slotsSelected ? item.gamename + " - to play" : item.gamename + " - on rent" : item.accessoryname ? item.accessoryname : item.subcategoryname;
                    dispatch({
                        type: "ADD_CART",
                        payload: [itemName, item]
                    });
                }
            }
            else {
                if (localStorage.getItem("cart")) {
                    let body = {
                        cart: localStorage.getItem("cart"),
                        mobileno: mobileNumber
                    }

                    let result = await postData("userdetail/addCart", body);

                    if (!result.result) {
                        alert("Error");
                    }
                }
            }

        }
        props.history.push({'pathname': prePage}, {"product": item, "listItem": listItem });

    }

    const handleShowCart=()=>{
    if(otp===getOtpInput) {
        dispatch({type:'ADD_USER',payload:[userData.mobileno,userData]})
        addCart().then(r => 0);

    }
    else
    {
      alert("Invalid Case....")   
    }

    }

    const showOtp = () => {
        const Completionist = () => <span style={{ color: 'red', }}>Times Up!</span>;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',width:300 }}>
                <OtpInput
                    value={getOtpInput}
                    onChange={(value)=>setOtpInput(value)}
                    inputStyle="inputStyle"  
    
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
                <div style={{margin:10}}><Button
        variant="contained"
        
        fullWidth
        color={'#000'}
        style={{background:'#1e6b7b',color:'#FFF',width:350}}
        startIcon={<VerifiedUserIcon />}
        onClick={()=>handleShowCart()}
      >
        Verify
      </Button></div>
            </div>

        )

    }

   const handleOtpClick=async()=>{
       let body={mobileno:mobileNumber}
       let result= await postData("userdetail/checkusermobilenumber",body)

       if (mobileNumber.length === 10) {
           let result= await postData("userdetail/checkusermobilenumber",body)

           if(result.result) {
               setUserData(result.data)
               let otp=otpGenerator.generate(4, {digits:true,alphabets:false,specialChars:false,upperCase:false});
               alert(otp)
               setOtp(otp)
               setshowbox(!showbox)
           }
           else {
               props.history.push({'pathname':'/signupform'},{"mobileno": mobileNumber, "page": prePage, "product": item, "listItem": listItem})
           }
       }
       else
           setMsg("INVALID_MOBILE_NUMBER")

   }
   
   const checkMobileNumber = (value) => {
        setMobileNumber(value);
        if (value.slice(0, 1) < 6 )
            setMsg("INVALID_MOBILE_NUMBER");
        if (value.length === 10)
            setMsg("");
   }


    const otpButton = () => {
        return (
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img alt={""} onClick={() =>handleOtpClick() } src="/otp.png" style={{ width: 50, height: 50, margin: 30 }} />
            </div>
        )

    }


    return (
    
        <div style={{overflow: "hidden"}}>

        <div style={{ padding: 10 }}>
   
 <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>

                    <img alt={""} src={"/registrationlogo.png"} style={{ width: 60, margin: 25 }} />

                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <div style={{ display: 'flex', margin:10 }}>Sign in to access your Orders, Offers, Wishlist.</div>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            width={14}
                            id="mobilenumber"
                            onChange={(event)=>setMobileNumber(event.target.value)}
                            label="Enter Your Mobile No."
                            name="mobilenumber"
                            autoComplete="email"
                            autoFocus
                             InputProps={{
                              startAdornment: <InputAdornment position="start">+91 | </InputAdornment>,
                             }}
                        />
                        {msg !== ""
                            ?
                            <div className={classes.textStyles2}>
                                {msg}
                            </div>
                            :
                            ""
                        }
                        <div>{otpButton()}</div>
                        {showbox ? showOtp() : <></>}

                        

                    </form>
                </div>
            </Grid>
        </Grid>
        </div>
 </div>
    );
}