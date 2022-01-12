import React,{useEffect} from "react"
import { useSelector } from "react-redux";
import { ServerURL } from "../FetchNodeServices";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
    },
    table: {
      minWidth: 700,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    margin: {
      marginRight: "80%",
      paddingLeft: "",
    },
    button: {
      margin: theme.spacing.unit,
    },
  
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });
  


function PaymentGateWay(props){
  
    let userData = useSelector((state) => state.user);
    let cart = useSelector((state) => state.cart);
    let user = Object.values(userData)[0];
    let keys = Object.keys(cart);

    const totalAmt = () => {
        let amt = 0
        for (let i=0; i<keys.length; i++) {
            let keyName = JSON.stringify(keys[i]);
            amt += (cart[keys[i]].offer > 0 ? cart[keys[i]].offer : cart[keys[i]].rentamt) * (keyName.includes("play") ? (cart[keys[i]].durationPlay * cart[keys[i]].qtydemandPlay) : (cart[keys[i]].duration * cart[keys[i]].qtydemand) )
        }
        return amt;
    }

    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH",
        amount: totalAmt()*100, //  = INR 1
        name: "Game Zone",
        description: 'Gurugram,Haryana',
        image:`${ServerURL}/images/logo.png`,
              
        handler: function (response) {
             
            alert(response.razorpay_payment_id);
        },
        prefill: {
          name: user.firstname + " " + user.lastname,
          contact:user.mobileno,
          email: user.emailid,
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "blue",
          hide_topbar: false,
        },
      };
    
    
      const openPayModal = () => {
        let rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);
    
      return (
        <>
          <center>
            <Button
              variant="contained"
              color="primary"
              // size="large"
              // className={classes.button}
              onClick={()=>openPayModal()}
            >
              <h3>Proceed to Pay</h3>
            </Button>
          </center>
        </>
      );
    };
    export default withStyles(styles)(PaymentGateWay);

