import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {ServerURL, postData, getData} from "../FetchNodeServices";
import { Button, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

////////////////DRAWER///////////
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Delete from "@material-ui/icons/Delete";
import Footer from "./Footer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {ArrowBackIos, CheckCircle} from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import swal from "sweetalert";


//////////////////////////////////
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
  defaultAddress: {

  },
  address: {
    color: "#FFF",
    background: "rgb(69, 123, 157)"
}
}));
export default function ShowCart(props) {
  const classes = useStyles();

    const [rent, setRent] = useState(props.rent);
    const [drawer, setDrawer] = useState(false);
    const [listGame, setListGame] = useState([]);
    const [listAccessory, setListAccessory] = useState([]);
    const [listSubCategory, setListSubCategory] = useState([]);
    const [listAddress, setListAddress] = useState([]);
    const [pageRender, setPageRender] = useState(false);
    const [currUser, setCurrUser] = useState([]);
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [addressId, setAddressId] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");

    let userData = useSelector((state) => JSON.parse(localStorage.getItem("userData")));
    let cart = useSelector((state)=> state.cart);
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

    const totalSaving = () => {
        let saving = 0
        for (let i=0; i<keys.length; i++) {
            let keyName = JSON.stringify(keys[i]);
            saving += (cart[keys[i]].rentamt - cart[keys[i]].offer) * (keyName.includes("play") ? (cart[keys[i]].durationPlay * cart[keys[i]].qtydemandPlay) : (cart[keys[i]].duration * cart[keys[i]].qtydemand) )
        }
        return saving;
    }

    const actualAmt = () => {
        let price = 0
        for (let i=0; i<keys.length; i++) {
            let keyName = JSON.stringify(keys[i]);
            price += cart[keys[i]].rentamt * (keyName.includes("play") ? (cart[keys[i]].durationPlay * cart[keys[i]].qtydemandPlay) : (cart[keys[i]].duration * cart[keys[i]].qtydemand) )
        }
        return price;
    }

    const fetchAllGames=async()=>{
        let result = await getData("game/displayall");
        setListGame(result);
    }

    const fetchAllAccessories = async () => {
        let result = await getData("accessories/displayall");
        setListAccessory(result);
    };

    const fetchAllSubcategory = async () => {
        let result = await getData("subcategory/displayall");
        setListSubCategory(result);
    };

    const fetchAllAddresses = async () => {
        let body = {mobileno: user.mobileno}
        let result = await postData("userAddress/displayall", body);
        setListAddress(result);
    }

    const fetchUser = async () => {
        let result = await postData("userdetail/displayall", {mobileno: user.mobileno});
        setCurrUser(result);
    }

    const fetchStateCity= async (value)=> {
        setZipcode(value);
        if (value.length === 6) {
            const response = await fetch("https://api.postalpincode.in/pincode/" + value);
            const result = await response.json();
            if (result[0].PostOffice) {
                setStates(result[0].PostOffice[0].State);
                setCity(result[0].PostOffice[0].District);
            }
        }
    }

    useEffect(function () {
        fetchUser().then(r=> 0);
        fetchAllSubcategory().then(r=> 0);
        fetchAllAccessories().then(r=> 0);
        fetchAllGames().then(r=> 0);
        fetchAllAddresses().then(r=> 0);
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [])


  let dispatch = useDispatch();

  /////////////////////DRAWER///////////////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [zipcode, setZipcode] = useState("");

    const turnRentOn=()=> setRent(props.rent);
    const turnPlayOn=()=> setRent(props.rent);

    const openDrawer=()=> {
        setDrawer(!drawer);
    }

    const handleDeleteAddress= async (address)=> {
        if (currUser.addressone === address.addressone)
            swal({
                title: "Default Address cannot be deleted.",
                icon: "warning",
                dangerMode: true,
            });

        else {
            let result = await postData("userAddress/deleteAddress", {addressid: address.addressid});

            if (result.result) {
                fetchAllAddresses().then(r => 0);
            }
        }
    }

    const handleDefaultAddress = async (address) => {
        let body = {
            address1: address.addressone,
            address2: address.addresstwo,
            state: address.state,
            city: address.city,
            zipcode: address.zipcode,
            mobileno: address.mobileno,
        };

        let result = await postData("userdetail/defaultAddress", body);

        if (result.result)
            await fetchUser();
    }

    const handleEditAddress=(address, current)=>{
        if (current) {
            setEditAddress(current);
            setAddAddress(!current);
            setAddress1(address.addressone);
            setAddress2(address.addresstwo);
            setCity(address.city);
            setDefaultAddress(address.addressone);
            setStates(address.state);
            setZipcode(address.zipcode);
            setAddressId(address.addressid);
        }
        else if (!address && !current) {
            setAddAddress(current);
            setEditAddress(current);
        }
        else {
            setAddAddress(!current);
            setEditAddress(current);
            setAddress1("");
            setAddress2("");
            setCity("");
            setStates("");
            setZipcode("");
        }
    }

    const handleAddAddress = async () => {
        let body = {
          address1: address1,
          address2: address2,
          state: states,
          city: city,
          zipcode: zipcode,
          mobileno: user.mobileno,
          addressid: addressId,
          default: false
        };

        if(addAddress) {
            let result = await postData("userAddress/addAddress", body);
            if (result.result === "exist") {
                await swal({
                    title: "Address already exist.",
                    icon: "warning",
                    dangerMode: true,
                });
                fetchAllAddresses().then(r=> setAddAddress(!addAddress));
                await fetchUser();
            }
            else if (result.result) {
                await fetchAllAddresses();
                await fetchUser();
                setAddAddress(false);
            }
        }
        else {
            if(currUser.addressone === defaultAddress)
                body.default = true;

            let result = await postData("userdetail/editAddress", body);

            if (result.result) {
                await fetchAllAddresses();
                await fetchUser();
                setEditAddress(false);
            }
        }
    };

    const showAddress=()=> {
        return listAddress.map((item)=> {
            return (
                <Grid container spacing={2} style={{padding: 10}}>
                    <Grid item xs={12}>
                        <div style={{padding: 10, border: "1px solid cyan", borderRadius: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                            <div>{user.firstname + " " + user.lastname} <sup onClick={()=> handleEditAddress(item, true)} style={{color: "darkcyan", cursor: "pointer"}}><EditOutlinedIcon style={{fontSize: "small"}}/>edit</sup></div>
                            <div>{item.zipcode}, {item.addressone}, {item.addresstwo}, {item.city}, {item.state}</div>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Delete onClick={()=> handleDeleteAddress(item)} style={{ fontSize: 20, color: 'red' }} />
                                <Button disabled={currUser.addressone === item.addressone} onClick={()=> handleDefaultAddress(item)} className={currUser.addressone === item.addressone ? classes.defaultAddress : classes.address}>{currUser.addressone === item.addressone ? <><CheckCircle /> Delivering Here</> : "Deliver Here"}</Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            )
        })
    }

  const toggleDrawer = (anchor, open, address) => (event) => {

    setAddAddress(address);
    setEditAddress(address);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
  addAddress || editAddress ? <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Grid container spacing={1} style={{ padding: 10 }}>
        <Grid item xs={12}>
            {listAddress.length ? <h5 style={{display: "flex", color: "darkcyan", cursor: "pointer"}} onClick={(event)=> handleEditAddress(false, false)}> <ArrowBackIos style={{fontSize: "small"}} /> Select Address</h5> : <></>}
          <h4>Hi {user.firstname} {user.lastname} </h4>
          <h5>{addAddress ? "Add" : "Edit"} your address..</h5>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setAddress1(event.target.value)}
            fullWidth
            variant="outlined"
            label="Address Line One"
            value={address1}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(event) => setAddress2(event.target.value)}
            fullWidth
            variant="outlined"
            label="Address Line Two"
            value={address2}
          />
        </Grid>

          <Grid item xs={12}>
              <TextField
                  onChange={(event) => fetchStateCity(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="Zipcode"
                  value={zipcode}
              />
          </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(event) => setStates(event.target.value)}
            fullWidth
            variant="outlined"
            label="State"
            value={states}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(event) => setCity(event.target.value)}
            fullWidth
            variant="outlined"
            label="City"
            value={city}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
             onClick={() => handleAddAddress()}
            color="primary"
          >
              {addAddress ? "Add Address" : "Edit Address"}
          </Button>
        </Grid>
      </Grid>
    </div>
      :
      <div style={{width: 350}}>
          {showAddress()}
          <Grid item xs={12}>
              <div style={{padding: 10, borderRadius: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                  <Button onClick={()=> handleEditAddress(true, false)} style={{padding: 10, border: "1px solid cyan", borderRadius: 5, display: "flex"}}>
                      <AddBoxIcon style={{color: "cyan"}} />
                      ADD NEW
                  </Button>
              </div>
          </Grid>
      </div>
  );

  //////////////////Manage Address And Payment Details//////////////////////////////////

  const userAddress=()=> {
      return (
          <div
              style={{
                  padding: 15,
                  background: "#FFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 20,
              }}
          >
              <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                  Delivery Address
              </div>
              <div>
                  {!listAddress.length ?
                      <><div style={{fontWeight: 400, marginBottom: 10 }}>
                          {user.firstname} {user.lastname}
                      </div>
                      <Button
                          style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              marginBottom: 10,
                              width: 300,
                          }}
                          variant="contained"
                          onClick={toggleDrawer("right", true, true)}
                          color="primary"
                      >
                          Add Address
                      </Button></>
                  :

                      <div style={{padding: 10, display: "flex", flexDirection: "column"}}>
                          <div>{currUser.firstname + " " + currUser.lastname}</div>
                          <div>{currUser.zipcode}, {currUser.addressone}, {currUser.addresstwo}, {currUser.city}, {currUser.state}</div>
                          <div style={{display: "flex", justifyContent: "flex-end"}}>
                              <Button onClick={toggleDrawer("right", true, false)} style={{color: "darkcyan"}}>change address</Button>
                          </div>
                      </div>}
              </div>
          </div>
      )
  }

    const findItemInCart =(item)=> {
        if(item === 0) {
            setPageRender(!pageRender);
            return 0;
        }
        let itemName = item.gameid ? item.gamename : item.accessoryid ? item.accessoryname : item.subcategoryname;
        for (let i=0; i<keys.length; i++) {
            if (itemName === keys[i]) {
                return cart[itemName].qtydemand;
            }
        }
        return 0;
    }


    const handleDelete = (item, addedFor) => {
        dispatch({ type: 'REMOVE_CART', payload: [item.gameid ? item.gamename + addedFor : item.accessoryid ? item.accessoryname : item.subcategoryname, item] });
        findItemInCart(0);
        return 0;
    }

  const  paymentDetails = () => {
    return (
        <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 2,
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
              Payment Details
          </div>

          <div style={{ display: "flex", flexDirection: "row"}}>
            <div
              style={{
                fontWeight: 400,
                marginBottom: 10,
                textAlign: "left",
                padding: 5,
                  color: "dimgrey",
              }}
            >
              M.R.P
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {actualAmt()}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 400,
                marginBottom: 10,
                  color: "dimgrey",
                padding: 5,
              }}
            >
              Product Discount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {totalSaving()}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 400,
                marginBottom: 10,
                  color: "dimgrey",
                padding: 5,
              }}
            >
              Delivery Charges
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {0}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 400,
                marginBottom: 10,
                  color: "dimgrey",
                padding: 5,
              }}
            >
              Total Amount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {totalAmt()}
            </div>
          </div>
          <Divider />
        </div>

        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            onClick={() => props.history.push({ pathname: "/paymentgateway" })}
            olor="primary"
            fullWidth
            style={{ background: "rgb(69, 123, 157)", color: "#FFF"}}
          >
            Make Payment
          </Button>
        </div>
      </div>
    );
  };

    const showCart = () => {

        let cartItems = [];
        for (let i=0; i<keys.length; i++) {
            let item = cart[keys[i]];
            let getItem = item.gameid ? listGame : item.accessoryid ? listAccessory : listSubCategory;
            let itemName = item.gameid ? item.gamename : item.accessoryid ? item.accessoryname : item.subcategoryname;
            cartItems[i] =
                <div style={{ width: "100%", display: 'flex', padding: 2 }}>
                    <div style={{display: "flex", width: "80%"}}>
                        <div style={{cursor: "pointer", padding: 5, display: 'flex', alignItems: 'center' }} onClick={() => goToItem(item, getItem, keys[i].includes("rent") ? "true" : "false")}>
                            <img alt={""} src={`${ServerURL}/images/${item.picture}`} width='120' />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: 10 }}>
                            <div style={{ fontSize: 16, fontWeight: "bold", padding: 2 }}>
                                {itemName.length > 10 ? itemName.toUpperCase().substring(0, 10) + ".." : itemName}
                            </div>
                            <div style={{ fontSize: 13, padding: 2 }}>
                                Day Price: <s> &#8377;{item.rentamt}</s>

                            </div>
                            <div style={{ fontSize: 13, padding: 2 }}>
              <span style={{ color: "green" }}>
                <b>You save </b>
              </span>
                                <b>&#8377; {item.rentamt - item.offer}</b>
                            </div>
                            <div style={{ fontSize: 11, padding: 2 }}>
                                <b>{item.gamename ? keys[i].includes("play") ? item.qtydemandPlay + "P x " + item.durationPlay : item.qtydemand + "U x " + item.duration : item.qtydemand + "U x " + item.duration} {item.gamename ? keys[i].includes("play") ? item.durationPlay > 1 ? "Hrs" : "Hr" : item.duration>1 ? "Days" : "Day" : item.duration>1 ? "Days" : "Day" } x &#8377;{item.offer > 0 ? item.offer :  item.rate ? item.rate : item.rentamt}
                                </b>
                            </div>

                        </div>
                    </div>
                    <div style={{width: "20%", marginRight: 15, fontSize: 14, fontWeight: 'bold', letterSpacing: 1, display: 'flex', flexDirection: "column", alignItems: "flex-end", justifyContent: "space-evenly"}}>
                        {item.offer > 0 ?
                            (<div><span>&#8377;</span> {item.offer * (keys[i].includes("play") ? (item.qtydemandPlay * item.durationPlay) : (item.duration * item.qtydemand) )}</div>) : (<div><span>&#8377;</span> {item.rate ? item.rate : item.rentamt * (keys[i].includes("play") ? (item.qtydemandPlay * item.durationPlay) : (item.duration * item.qtydemand) ) }</div>)}
                        <div onClick={()=> handleDelete(item, keys[i].includes("rent") ? " - on rent" : " - to play")}><Delete style={{ fontSize: 20, color: 'red' }} /></div>
                    </div>
                </div>
        }

        return cartItems;
    }

    const goToItem = (item, getItem, addedFor) => {
        localStorage.setItem("rent", addedFor)
        setRent(addedFor === "true");
        props.history.push({ pathname: "/productview" }, { product: item, "listItem": getItem});
    }

  return (
    <div style={{overflow: "hidden"}}>
        <Header sendData={openDrawer} turnRentOn={turnRentOn} turnPlayOn={turnPlayOn} rent={rent} history={props.history} />
        {!drawer?<><div style={{ padding: 25 }}>
          <div
              style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
              }}
          >
              <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <img alt={""} src="/registrationlogo.png" width="40" style={{ padding: 5 }} />
                  <span style={{ fontWeight: "bold", fontSize: 20 }} >
                  Order Summary
                </span>
              </div>
              <Divider style={{color: "#000", width: "100%", marginTop: 20}} />
          </div>
        <Grid container spacing={1}>
          <Grid items xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFF",
                borderRadius: 2,
                padding: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                    justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold"}}>
                  ({keys.length}) Items
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Total Amount: &#8377; {totalAmt()}
                </div>
              </div>

              {showCart()}
                <Divider style={{margin: 10}}/>
                {paymentDetails()}
            </div>
          </Grid>

          <Grid items xs={12} md={6} sm={6}>
              {userAddress()}
          </Grid>
        </Grid>
      </div>
      {/*DRAWER */}
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false, true)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
        <Footer history={props.history}/></>:<></>}
    </div>
  );
}
