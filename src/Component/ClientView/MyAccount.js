import React, {useState, useEffect} from "react";
import useStyles from "./Css";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import {postData} from "../FetchNodeServices";
import {CheckCircle, CheckOutlined, ClearOutlined, NavigateNext} from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Delete from "@material-ui/icons/Delete";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@material-ui/icons/Close';
import AddBoxIcon from "@material-ui/icons/AddBox";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid rgb(69, 123, 157)',
    boxShadow: 24,
    borderRadius: 20,
    p: 4,
    outline: "none"
};

export default function MyAccount(props) {
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);
    const [rent, setRent] = useState(props.history.location.state.rent);
    const [loginSecurity, setLoginSecurity] = useState(false);
    const [yourAddresses, setYourAddresses] = useState(false);
    const [changeColor, setChangeColor] = useState(false);
    const [user, setUser] = useState([]);

    const handleClose = () => {
        setEditAddress(false);
        setAddAddress(false);
    }

    const handleView=()=> {
        setLoginSecurity(false);
        setYourAddresses(false);
        setChangeColor(false);
    }

    const fetchUserData=async()=>{
            let mobileNumber = Object.keys(JSON.parse(localStorage.getItem("userData")))
            let body = {mobileno: mobileNumber}
            let result = await postData("userdetail/checkusermobilenumber", body)
            if (result.result) {
                setUser(result.data);
                setName(result.data.firstname + " " + result.data.lastname)
                setEmail(result.data.emailid);
                setMobile(result.data.mobileno);
                setPassword(result.data.password);
                setOldMobile(result.data.mobileno);
                setEditName(false);
                setEditEmail(false);
                setEditMobile(false);
                setEditPassword(false);
                setCurrUser(result.data);
            }
    }

    const turnRentOn=()=> setRent(true);
    const turnPlayOn=()=> setRent(false);

    const openDrawer=()=> {
        setDrawer(!drawer);
    }

    useEffect(function () {
        fetchUserData().then(r=> 0);
        fetchAllAddresses().then(r=> 0);
        window.scrollTo(0, 0);
    }, []);


/////////////////////////////////////////////////*Login & Security Start*/////////////////////////////////////////////////
    const [name, setName] = useState("");
    const [editName, setEditName] = useState(false);
    const [email, setEmail] = useState("");
    const [editEmail, setEditEmail] = useState(false)
    const [mobile, setMobile] = useState("");
    const [editMobile, setEditMobile] = useState(false);
    const [oldMobile, setOldMobile] = useState(false);
    const [password, setPassword] = useState("");
    const [editPassword, setEditPassword] = useState(false);

    const handleUserUpdate=async ()=> {
        let body = {
            firstname: name.split(" ")[0],
            lastname: name.slice(name.indexOf(" ")+1),
            email: email,
            mobileno: mobile,
            password: password,
            oldmobileno: oldMobile
        }

        let result = await postData("userdetail/updateUserData", body);

        if (result.result) {
            await fetchUserData();
        }

    }

    const showLoginSecurityMenu =()=> {
        return (
            <div className={classes.gridContent2}>
                <div style={{display: "flex", alignItems: "center", padding: 10}}>
                    <span onClick={handleView} style={{cursor: "pointer", color: changeColor ? "red" : "navy"}}>{changeColor ? <u onMouseOut={()=> setChangeColor(false)}>Your Account</u> : <div onMouseOver={()=> setChangeColor(true)}>Your Account</div>} </span> <NavigateNext style={{fontSize: 14, margin: 5}}/> <span style={{color: "red"}}>Login & Security</span>
                </div>
                <div style={{justifyContent: "flex-start"}} className={classes.textStyles}>
                    Login & Security
                </div>
                <div style={{width: 350, border: "1px solid cyan", padding: 10}}>
                    <div className={classes.userData}>
                        <div >
                            {
                                !editName ?
                                    <><div style={{fontWeight: 600}}>Name:</div>
                                    <div className={classes.textStyles2} style={{justifyContent: "flex-start"}}>{user.firstname + " " + user.lastname}</div></>
                                    :
                                    <TextField onChange={(event)=>setName(event.target.value)} label="Name" value={name} variant="outlined" fullWidth/>
                            }
                        </div>
                        <div style={{borderRadius: 15, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                            {
                                !editName ?
                                    <Button className={classes.editBtnHover} onClick={()=> setEditName(true)} >EDIT</Button>
                                    :
                                    <>
                                        <CheckOutlined style={{fontSize: "xx-large", color: "navy", margin: 5, cursor: "pointer"}} onClick={()=> handleUserUpdate()} />
                                        <ClearOutlined style={{fontSize: "xx-large", color: "green", margin: 5, cursor: "pointer"}} onClick={()=> setEditName(false)} />
                                    </>
                            }
                        </div>
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                    <Divider />
                    </div>
                    <div className={classes.userData}>
                        <div >
                            {
                                !editEmail ?
                                    <><div style={{fontWeight: 600}}>Email:</div>
                                        <div className={classes.textStyles2} style={{justifyContent: "flex-start"}}>{user.emailid}</div></>
                                    :
                                    <TextField onChange={(event)=>setEmail(event.target.value)} label="Email ID" value={email} variant="outlined" fullWidth/>
                            }
                        </div>
                        <div style={{borderRadius: 15, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                            {
                                !editEmail ?
                                    <Button className={classes.editBtnHover} onClick={()=> setEditEmail(true)} >EDIT</Button>
                                    :
                                    <>
                                        <CheckOutlined style={{fontSize: "xx-large", color: "navy", margin: 5, cursor: "pointer"}} onClick={()=> handleUserUpdate()} />
                                        <ClearOutlined style={{fontSize: "xx-large", color: "green", margin: 5, cursor: "pointer"}} onClick={()=> setEditEmail(false)} />
                                    </>
                            }
                        </div>
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <Divider />
                    </div>

                    <div className={classes.userData}>
                        <div >
                            {
                                !editMobile ?
                                    <><div style={{fontWeight: 600}}>Mobile No:</div>
                                        <div className={classes.textStyles2} style={{justifyContent: "flex-start"}}>{user.mobileno}</div></>
                                    :
                                    <TextField onChange={(event)=>setMobile(event.target.value)} label="Mobile No" value={mobile} variant="outlined" fullWidth/>
                            }
                        </div>
                        <div style={{borderRadius: 15, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                            {
                                !editMobile ?
                                    <Button className={classes.editBtnHover} onClick={()=> setEditMobile(true)} >EDIT</Button>
                                    :
                                    <>
                                        <CheckOutlined style={{fontSize: "xx-large", color: "navy", margin: 5, cursor: "pointer"}} onClick={()=> handleUserUpdate()} />
                                        <ClearOutlined style={{fontSize: "xx-large", color: "green", margin: 5, cursor: "pointer"}} onClick={()=> setEditMobile(false)} />
                                    </>
                            }
                        </div>
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <Divider />
                    </div>

                    <div className={classes.userData}>
                        <div >
                            {
                                !editPassword ?
                                    <><div style={{fontWeight: 600}}>Password:</div>
                                        <div className={classes.textStyles2} style={{justifyContent: "flex-start"}}>{"*".repeat(user.password.length)}</div></>
                                    :
                                    <TextField onChange={(event)=>setPassword(event.target.value)} label="Password" value={password} variant="outlined" fullWidth/>
                            }
                        </div>
                        <div style={{borderRadius: 15, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                            {
                                !editPassword ?
                                    <Button className={classes.editBtnHover} onClick={()=> setEditPassword(true)} >EDIT</Button>
                                    :
                                    <>
                                        <CheckOutlined style={{fontSize: "xx-large", color: "navy", margin: 5, cursor: "pointer"}} onClick={()=> handleUserUpdate()} />
                                        <ClearOutlined style={{fontSize: "xx-large", color: "green", margin: 5, cursor: "pointer"}} onClick={()=> setEditPassword(false)} />
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }


/////////////////////////////////////////////////*Login & Security End*///////////////////////////////////////////////////

/////////////////////////////////////////////////*Your Addresses Start*/////////////////////////////////////////////////

    const [listAddress, setListAddress] = useState([]);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [states, setStates] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [currUser, setCurrUser] = useState([]);
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [addressId, setAddressId] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");

    const fetchAllAddresses = async () => {
        let body = {mobileno: Object.keys(JSON.parse(localStorage.getItem("userData")))}
        let result = await postData("userAddress/displayall", body);
        setListAddress(result);
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


    const handleDeleteAddress= async (address)=> {
        if (currUser.addressone === address.addressone)
            alert("Default address cannot be deleted");

        else {
            let result = await postData("userAddress/deleteAddress", {addressid: address.addressid});

            if (result.result) {
                alert("Address deleted successfully.");
                fetchAllAddresses().then(r => 0);
            } else
                alert("Failed to delete address");
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

        if (result.result) {
            alert("Default address changed.")
            await fetchUserData();
        } else {
            alert("Fail to change default address.");
        }
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
                alert("Address already exist");
                fetchAllAddresses().then(r=> setAddAddress(!addAddress));
                await fetchUserData();
            }
            else if (result.result) {
                alert("Address added successfully");
                await fetchAllAddresses();
                await fetchUserData();
                setAddAddress(false);
            }
        }
        else {
            if(currUser.addressone === defaultAddress)
                body.default = true;

            let result = await postData("userdetail/editAddress", body);

            if (result.result) {
                alert("Address updated successfully.")
                await fetchAllAddresses();
                await fetchUserData();
                setEditAddress(false);
            } else {
                alert("Fail to update address.");
            }
        }
    };

    const fillAddresses=()=> {
        return listAddress.map((item)=> {
            return (
                <Grid item xs={12} sm={4}>
                    <div style={{padding: 10, height: 150, border: "1px solid cyan", borderRadius: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div>{user.firstname + " " + user.lastname} <sup onClick={()=> handleEditAddress(item, true)} style={{color: "darkcyan", cursor: "pointer"}}><EditOutlinedIcon style={{fontSize: "small"}}/>edit</sup></div>
                            <div>{item.zipcode}, {item.addressone}, {item.addresstwo}, {item.city}, {item.state}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Delete onClick={()=> handleDeleteAddress(item)} style={{ fontSize: 20, color: 'red' }} />
                            <Button disabled={currUser.addressone === item.addressone} onClick={()=> handleDefaultAddress(item)} className={currUser.addressone === item.addressone ? classes.defaultAddress : classes.address}>{currUser.addressone === item.addressone ? <><CheckCircle /> Delivering Here</> : "Deliver Here"}</Button>
                        </div>
                    </div>
                </Grid>
            )
        })
    }

    const showAddressMenu =()=> {
        return (
            <div style={{width: "100%"}} className={classes.gridContent2}>
                <div style={{width: "70%", display: "flex", alignItems: "center", padding: 10}}>
                    <span onClick={handleView} style={{cursor: "pointer", color: changeColor ? "red" : "navy"}}>{changeColor ? <u onMouseOut={()=> setChangeColor(false)}>Your Account</u> : <div onMouseOver={()=> setChangeColor(true)}>Your Account</div>} </span> <NavigateNext style={{fontSize: 14, margin: 5}}/> <span style={{color: "red"}}>Your Addresses</span>
                </div>
                <div style={{width: "70%", justifyContent: "flex-start"}} className={classes.textStyles}>
                    Your Addresses
                </div>
                <div style={{width: "70%", padding: 10}}>
                    <div style={{width: "100%"}} className={classes.gridContent2}>
                        <Grid container spacing={3}>
                            {fillAddresses()}
                            <Grid item xs={12} sm={4}>
                                <div style={{padding: 10, height: 150, border: "1px solid cyan", borderRadius: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <Button onClick={()=> handleEditAddress(true, false)} style={{padding: 10}}>
                                        <AddBoxIcon style={{color: "cyan"}} />
                                        ADD NEW
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div>
                    <Modal
                        open={editAddress || addAddress}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
                                <div onClick={handleClose} style={{border: "outset", background: "blue", color: "primary", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}} >
                                    <CloseIcon style={{color: "#FFF"}} />
                                </div>
                            </div>
                            <Grid container spacing={1} style={{ padding: 10 }}>
                                <Grid item xs={12}>
                                    <h4>Hi {user.firstname} {user.lastname} </h4>
                                    <h5>{addAddress ? "Add" : "Edit"} your address..</h5>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(event) => setAddress1(event.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        label="Flat, House no."
                                        value={address1}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(event) => setAddress2(event.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        label="Area, Street"
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
                        </Box>
                    </Modal>
                </div>
            </div>
        )
    }


/////////////////////////////////////////////////*Your Addresses End*///////////////////////////////////////////////////

///////////////////////////////////////////////////*My Account Start*/////////////////////////////////////////////////////

    const showMyAccount=()=> {
        return (
            !loginSecurity && !yourAddresses ?
                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{width: "70%"}} className={classes.gridContent2}>
                        <div style={{width: "100%", justifyContent: "flex-start"}} className={classes.textStyles}>
                            Your Account
                        </div>
                        <div style={{width: "100%"}} className={classes.gridContent2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <div style={{display: "flex", height: 100, width: 300, border: "1px solid cyan", borderRadius: 10}}>
                                        <div style={{width: 60, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img alt={""} src={"/orders.jpg"} style={{maxWidth: 70, maxHeight: 70}}/>
                                        </div>
                                        <div style={{margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                            <span style={{fontSize: 18}}>Your Orders</span>
                                            <span className={classes.textStyles2} style={{color: "dimgrey", marginTop: 5}}>Track, return, or buy things again</span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div onClick={()=> setLoginSecurity(true)} style={{display: "flex", height: 100, width: 300, border: "1px solid cyan", borderRadius: 10, cursor: "pointer"}}>
                                        <div style={{width: 60, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img alt={""} src={"https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"} style={{maxWidth: 70, maxHeight: 70}}/>
                                        </div>
                                        <div style={{margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                            <span style={{fontSize: 18}}>Login & Security</span>
                                            <span className={classes.textStyles2} style={{color: "dimgrey", marginTop: 5}}>Edit login, name, and mobile number</span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div style={{display: "flex", height: 100, width: 300, border: "1px solid cyan", borderRadius: 10}}>
                                        <div style={{width: 60, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img alt={""} src={"/premium.jpg"} style={{maxWidth: 70, maxHeight: 70}}/>
                                        </div>
                                        <div style={{margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                            <span style={{fontSize: 18}}>Premium</span>
                                            <span className={classes.textStyles2} style={{color: "dimgrey", marginTop: 5}}>View benefits and payment settings</span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{width: "100%", marginTop: 20}} className={classes.gridContent2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <div style={{display: "flex", height: 100, width: 300, border: "1px solid cyan", borderRadius: 10}}>
                                        <div style={{width: 60, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img alt={""} src={"https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"} style={{maxWidth: 70, maxHeight: 70}}/>
                                        </div>
                                        <div onClick={()=> setYourAddresses(true)} style={{margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", cursor: "pointer"}}>
                                            <span style={{fontSize: 18}}>Your Addresses</span>
                                            <span className={classes.textStyles2} style={{color: "dimgrey", marginTop: 5}}>Edit addresses for orders and gifts</span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div style={{display: "flex", height: 100, width: 300, border: "1px solid cyan", borderRadius: 10}}>
                                        <div style={{width: 60, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img alt={""} src={"https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png"} style={{maxWidth: 70, maxHeight: 70, marginLeft: 5}}/>
                                        </div>
                                        <div style={{margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                            <span style={{fontSize: 18}}>Payment options</span>
                                            <span className={classes.textStyles2} style={{color: "dimgrey", marginTop: 5}}>Edit or add payment methods</span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div style={{display: "flex", height: 100, width: 300, border: "1px solid cyan", borderRadius: 10}}>
                                        <div style={{width: 60, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img alt={""} src={"/gamingpoint.jpg"} style={{maxWidth: 70, maxHeight: 70}}/>
                                        </div>
                                        <div style={{margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                            <span style={{fontSize: 18}}>G - points</span>
                                            <span className={classes.textStyles2} style={{color: "dimgrey", marginTop: 5}}>Earn & use gaming points for new purchases</span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                :
                <></>
        )
    }
////////////////////////////////////////////////////*My Account End*//////////////////////////////////////////////////////


    return (
        <div style={{overflow: "hidden"}}>
            <div>
                <Header sendData={openDrawer} turnRentOn={turnRentOn} turnPlayOn={turnPlayOn} rent={rent} history={props.history} />
            </div>
            {
                !drawer ?
                <>{showMyAccount()} {loginSecurity ? showLoginSecurityMenu() : yourAddresses ? showAddressMenu() : <></>}
                <Footer history={props.history} />
                </>
                :
                <></>
            }
        </div>
    )
}
