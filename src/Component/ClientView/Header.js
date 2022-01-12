import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import {getData, postData, ServerURL} from "../FetchNodeServices";
import {NavigateNext, ShoppingCart} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingBasketOutlined from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import Delete from "@material-ui/icons/Delete";
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyle = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#FFF',
        "&:hover": {
            backgroundColor: '#FFF',
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        color:'#10ac84',
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f2f6",

        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
    },

    LocationIcon: {
        padding: theme.spacing(0, 2),
        color:'#747d8c',
        //position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f2f6",
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
    },
    inputRoot: {
        color: "#000",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "50ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    secAppbarDesktop: {
        background: "#457b9d",
        overflow: "hidden",
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        borderTop: "5px solid #151b39",
        borderBottom: "5px solid #151b39"
    },
    secAppbarMobile: {
        background: "#151b39",
        position: "absolute",
        zIndex: 1,
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        overflow: "hidden"
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    textStyles: {
        fontSize: 18,
        color: "#151b39",
        fontWeight: "normal",
        display: "flex",
        letterSpacing: 3,
        padding: 10,
        fontFamily: 'Georgia,Times,"Times New Roman", serif',
        justifyContent: "center"
    },
    textStyles2: {
        color: "#151b39",
        display: "flex",
        fontSize: 15,
        fontFamily: 'Georgia,Times,"Times New Roman", serif',
        justifyContent: "center"
    }
}));

export default function Header(props) {
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (cid, cname) => (event) => {
        fetchAllSubCategoryByCategory(cid, cname).then(r => 0);
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [anchorMEl, setAnchorMEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const [listCategory, setListCategory] = useState([]);
    const [listGame, setListGame] = useState([]);
    const [listAccessory, setListAccessory] = useState([]);
    const [listSubCategory, setListSubCategory] = useState([]);
    const [listGameBC, setListGameBC] = useState([]);
    const [listAccessoryBC, setListAccessoryBC] = useState([]);
    const [listSubCategoryBC, setListSubCategoryBC] = useState([]);
    const [drawer, setDrawer] = useState(false);
    const [fetchNext, setFetchNext] = useState(false);
    const [fetchNext2, setFetchNext2] = useState(false);
    const [catName, setCatName] = useState("");
    const [product, setProduct] = useState("");
    const [myOptions, setMyOptions] = useState([]);
    const [userData,setUserData]=useState([]);
    const [open, setOpen] = useState(false);
    const [changeColor, setChangeColor] = useState(false);
    const [changeColor2, setChangeColor2] = useState(false);
    const [rent, setRent] = useState(JSON.parse(localStorage.getItem("rent")));
    const [state, setState] = useState({
        left : false,
        right: false,
        top : false,
        bottom: false,
    })

    let set = {
        dots: false,
        // infinite: true,
        // speed: 1000,
        spacing: 4,
        // autoplay: true,
        // autoplaySpeed: 2000,
        // arrows: false,
        responsive : [{
            breakpoint: 300,
            settings: {
                centerMode: true,
                display: "flex",
                width: 300,

                //  marginTop: 5,
                // marginRight: 100,
                flexDirection: "column",
                //flexGrow: 1,
                // alignContent: 'stretch',
            }
        }]
    };

    let dispatch = useDispatch();
    let cart = useSelector((state)=> state.cart);
    let keys=Object.keys(cart);

    
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


    const handleBuy=()=> {
        if (userData.mobileno) {
            props.history.push({ 'pathname': '/showcart' }, {"rent": rent})
        } else {
            props.history.push({ pathname: '/mobileregistration' }, {"page": getCurrentUrl(), "item": props.item, "listItem": props.listItem})
        }
    }

    /////////////////////Menu Design////////////////////////

    const fetchAllCategory = async () => {
        let result = await getData("categories/dispalyallcategory");
        setListCategory(result);
    };

    const fetchAllGames=async()=>{
        let result = await getData("game/displayall");
        setListGame(result);
    }

    const fetchUserData=async()=>{
        if(userData) {
            let mobileNumber = Object.keys(JSON.parse(localStorage.getItem("userData")))
            let body = {mobileno: mobileNumber}
            let result = await postData("userdetail/checkusermobilenumber", body)
            if (result.result)
                setUserData(result.data)
        }
    }

    const fetchAllAccessories = async () => {
        let result = await getData("accessories/displayall");
        setListAccessory(result);
    };

    const fetchCategoryData = (cid, cname) => {
        setCatName(cname);
        fetchAllSubCategoryByCategory(cid).then(r=>0);
        fetchAllAccessoriesByCategory(cid).then(r=>0);
        fetchAllGamesByCategory(cid).then(r=>0);
        setFetchNext(!fetchNext);
    }

    const fetchAllSubCategoryByCategory = async (cid) => {
        let body = { categoryid: cid };
        let result = await postData("subcategory/displaysubcategorybycategoryid", body);
        setListSubCategoryBC(result);
    };

    const fetchAllAccessoriesByCategory=async (cid)=> {
        let body = {categoryId: cid}
        let result = await postData("accessories/findaccessory",body);
        setListAccessoryBC(result);
    }

    const fetchAllGamesByCategory = async(cid)=>{
        let body = {value: cid}
        let list = await postData("game/searchgamesbycategory",body);
        setListGameBC(list);
    };

    const fetchAllSubcategory = async () => {
        let list = await getData("subcategory/displayall");
        setListSubCategory(list);
    };

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, true)}
            onKeyDown={toggleDrawer(anchor, true)}
            style={{ overflowX: "hidden" }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', width: 350, padding: 2}}>
                <div style={{ padding: 5, display: 'flex', alignItems: 'center' }}>
                    <ShoppingBasketOutlined />
                    <div style={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1, padding: 3, display: 'flex', alignItems: 'center' }}>{keys.length} Items</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1, width: 230, padding: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' , flexDirection: 'row', color: '#FFF'}}>
                </div>
            </div>
            {keys.length ? <>
                <Divider />
                {showCart()}
                <Divider />
                {paymentDetails()} </> : <></>}
        </div>
    );

    const menuCategoryItems = () => {
        return listSubCategory.map((item) => {
            return (
                <Grid item xs={12} spacing={6}>
                    <div
                        onClick={() =>
                            props.history.push(
                                { pathname: "/productview" },
                                { product: item, "rent": rent, "listItem": listSubCategory },
                                {...set}
                            )
                        }
                    >
                        <MenuItem onClick={handleClose}  >{item.subcategoryname}</MenuItem>
                    </div></Grid>
            )
        })

    }

    const handleClose = () => {
        setAnchorMEl(null);
    };

    const list1 = (anchor, item) => (

        <Grid xs={12} style={{display:'block',justifyContent:'left',alignItems:'left' }}>
            <div className={clsx(classes.list,{
                [classes.fullList]: anchor  === 'top' || anchor === 'bottom',
            })}
                 role="presentation"
                 onClick={toggleDrawer(anchor, true)}
                 onKeyDown={toggleDrawer(anchor, true)}
            >

                <Grid item xs={12} fullWidth style={{display:'flex', justifyContent:'left', alignItems:'left', flexDirection: 'column', marginTop: 25, padding: 5, }}>
                    <div style={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 1, padding: 3, display: 'stretch', alignItems: 'left', fontFamily: 'Karla, sans-serif' ,}}>
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography className={classes.typography}><Button onClick={handleClick('right-start')}>{menuCategoryItems()}</Button>
                                        </Typography>
                                    </Paper>
                                </Fade>

                            )}
                        </Popper>

                        {menuCategory()}
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorMEl}
                            keepMounted
                            open={Boolean(anchorMEl)}
                            onClose={handleClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            {menuCategoryItems()}

                        </Menu>

                        {/* {menuCategoryItems()} */}
                    </div>


                </Grid>
            </div>
        </Grid>
    );


    const handleDelete = (item, addedFor) => {
        if (window.location.href.slice(window.location.href.lastIndexOf("/")+1) === "productview") {
            if (addedFor === " - to play")
                props.deletePlayItem(0, item);
            else
                props.deleteRentItem(0, item);
        }
        else
            dispatch({ type: "REMOVE_CART", payload: [item.gameid ? item.gamename + addedFor : item.accessoryid ? item.accessoryname : item.subcategoryname, item] });
    }

    const  paymentDetails = () => {
        return (
            <div>
                <div
                    style={{
                        background: "#FFF",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: 18,
                            letterSpacing: 2,
                            fontWeight: "bold",
                            marginTop: 10,
                            marginBottom: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            Payment Details
                            <Divider style={{background: "#252324"}}/>
                        </div>
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
                        onClick={handleBuy}
                        olor="primary"
                        fullWidth
                        style={{ background: "#252324", color: "#FFF"}}
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        );
    };

    const goToItem = (item, getItem, addedFor, fromDrawer=0) => {
        if (fromDrawer) {
            openDrawer();
            setChangeColor(false);
            setChangeColor2(false);
        }
        localStorage.setItem("rent", addedFor)
        if (addedFor === "true")
            turnRentOn();
        else {
            'gamename' in item ? turnPlayOn(item) : turnRentOn();
        }

        props.history.push({ pathname: "/productview" }, { product: item, "listItem": getItem});
    }

    const showCart = () => {

        let cartItems = [];
        for (let i=0; i<keys.length; i++) {
            let item = cart[keys[i]];
            let getItem = item.gameid ? listGame : item.accessoryid ? listAccessory : listSubCategory;
            let itemName = item.gameid ? item.gamename : item.accessoryid ? item.accessoryname : item.subcategoryname;
            cartItems[i] =
                <div style={{ width: 350, display: 'flex', padding: 2 }}>
                    <div style={{display: "flex", width: "80%"}}>
                        <div style={{cursor: "pointer", padding: 5, display: 'flex', alignItems: 'center' }} onClick={() => goToItem(item, getItem,keys[i].includes(" - to play") ? "false" : "true")}>
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
                        <div onClick={()=> handleDelete(item, item.gamename ? keys[i].includes("rent") ? " - on rent" : " - to play" : "")}><Delete style={{ fontSize: 20, color: 'red' }} /></div>
                    </div>
                </div>
        }

        return cartItems;
    }

    const setDrawerItem = (product) => {
      setChangeColor(false);
      setChangeColor2(false);
      setProduct(product);
      setFetchNext2(true);
    }

    const showCategoryData =()=>{
        let itemList = product === "Consoles" ? listSubCategory : product === "Games" ? listGame : listAccessory;
        return (product === "Consoles" ? listSubCategoryBC : product === "Games" ? listGameBC : listAccessoryBC).map((item) => {
            let itemName = product === "Consoles" ? item.subcategoryname : product === "Games" ? item.gamename : item.accessoryname;
            return (
                <div style={{width: "100%"}}>
                    <div
                        style={{
                            marginLeft: 20,
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                        onClick={()=> goToItem(item, itemList, cart[itemName + " - to play"] ? cart[itemName + " - on rent"] ? localStorage.getItem("rent") :  "false" : cart[itemName + " - on rent"] ? "true" : localStorage.getItem("rent"), 1)}
                    >
                        <span>{itemName}</span>

                        <img
                            src={`${ServerURL}/images/${item.picture}`}
                            width="100px"
                            height="100px"
                            alt={itemName}
                        />
                    </div>
                    <hr color={"aliceblue"} />
                </div>
            )
        });
    }

    const showSubCategory2 =()=>{
        return listSubCategory.map((item) => {
            return (
                <div>
                    <MenuItem onClick={() => props.history.push({ pathname: "/productview" }, { product: item, "listItem": listSubCategory })}>{item.subcategoryname}</MenuItem>
                </div>
            )
        });
    }

    const handleLogout=()=> {
        dispatch({ type: 'REMOVE_USER', payload: {}})
        if (getCurrentUrl() === "/home")
            window.location.reload();
        else
            props.history.push({pathname: "/home"});
    }

    const checkCart=()=> {
        if(localStorage.getItem("userData")) {
            let user = JSON.parse(localStorage.getItem("userData"));
            dispatch({ type: 'SET_USER', payload: user});
            fetchUserData().then(r=>0);
        }
        if(localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"));
            dispatch({ type: 'SET_ALL_ITEM', payload: cart})
        }

    }

    const checkRent =()=> {
        if(localStorage.getItem("rent")) {
            setRent(JSON.parse(localStorage.getItem("rent")));
        }
        else
            localStorage.setItem("rent", "true");
    }

    useEffect(function () {
        checkCart();
        checkRent();
        fetchAllCategory().then(r=>0);
        fetchAllSubcategory().then(r=>0);
        fetchAllGames().then(r=>0);
        fetchAllAccessories().then(r=>0);
        // eslint-disable-next-line
    }, []);

    const menuCategory = () => {
        return listCategory.map((item, index) => {
            return (<>
                <Button className={classes.textStyles2}
                    style={{width: "90%", color: "#000", marginRight: 25, cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "space-between"}}
                    onClick={()=> fetchCategoryData(item.categoryid, item.categoryname)}
                >
                    <img
                        alt={""}
                        src={`${ServerURL}/images/${item.icon}`}
                        width="80"
                        height="80"
                    />
                    <span>{item.categoryname}</span>
                    <NavigateNext />
                </Button>
                {!index ? <hr color={"aliceblue"} width="100%" /> : <></>}
                </>
            );
        });
    };

    const menuCategory2 = () => {
        return listCategory.map((item) => {
            return (
                <div>
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick2(item.categoryid, item.categoryname)}
                        style={{color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "flex-end", cursor: 'pointer', fontWeight: 600, width: 210}}
                    >
                        <Avatar src={`${ServerURL}/images/${item.icon}`} />{item.categoryname}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClick={handleClose2}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {showSubCategory2()}
                    </Menu>
                </div>
            );
        });
    };

    const turnRentOn=()=> {
        if(props.turnRentOn()) {
            setRent(true);
        }
    }

    const turnPlayOn=(item)=> {
        if(props.turnPlayOn(item.rentamt ? item : props.item)) {
            setRent(false);
        }
    }

    const openProductPage=()=> {
        let input =  document.getElementById('myInput').value.toUpperCase();

        for (let i=0; i<listSubCategory.length; i++) {
            if(input === listSubCategory[i].subcategoryname.toUpperCase())
                goToItem(listSubCategory[i], listSubCategory, "true");
        }
        for (let i=0; i<listAccessory.length; i++) {
            if(input === listAccessory[i].accessoryname.toUpperCase())
                goToItem(listAccessory[i], listAccessory, "true");
        }
        for (let i=0; i<listGame.length; i++) {
            if(input === listGame[i].gamename.toUpperCase())
                goToItem(listGame[i], listGame, cart[listGame[i].gamename + " - to play"] ? cart[listGame[i].gamename + " - to rent"] ? localStorage.getItem("rent") : "false" : cart[listGame[i].gamename + " - to rent"] ? "true" : localStorage.getItem("rent"))
        }
    }

    const showSearchBar=()=> {
        return (

            <Autocomplete
                style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                id = "myInput"
                renderInput={(params) => (
                    <><TextField {...params}
                                 onChange={searchBar}
                                 onKeyPress={openProductPage}
                                 variant="filled"
                                 label="Search..."
                                 size="small"
                    />
                        <TextField style={{width: 60, cursor: "pointer"}}
                                   onClick={openProductPage}
                                   variant="filled"
                                   label={<SearchIcon style={{fontSize: "x-large"}} /> }
                                   size="small"
                        /></>
                )}
            />

        )
    }

    const searchBar=()=> {
        let input =  document.getElementById('myInput').value.toUpperCase();
        let match = [];

        if(input.length === 0) {
            setMyOptions([]);
            return;
        }

        const largest = Math.max(listSubCategory.length, listAccessory.length, listGame.length);

        for (let i = 0, j=0; i < largest; i++) {
            if (i < listSubCategory.length && listSubCategory[i].subcategoryname.toUpperCase().includes(input))
                match[j++] = listSubCategory[i].subcategoryname;

            else if (i < listAccessory.length && listAccessory[i].accessoryname.toUpperCase().includes(input))
                match[j++] = listAccessory[i].accessoryname;

            else if (i < listGame.length && listGame[i].gamename.toUpperCase().includes(input))
                match[j++] = listGame[i].gamename;

        }
        setMyOptions(match);
    }

    const openDrawer=()=> {
        setDrawer(!drawer);
        props.sendData();
    }

    const playButton = (view) => {
      return (
          <Button className={view === "desktop" ? classes.sectionDesktop : classes.sectionMobile} style={{marginLeft: 30, background: "aliceblue", borderRadius: 20, minWidth: 150}}>
              {JSON.parse(localStorage.getItem("rent")) ?
                  <><Button style={{cursor: "pointer", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: "#252324", minWidth: "50%", color: "#FFF"}} onClick={turnRentOn}>
                      <strong>RENT</strong>
                  </Button>
                      <Button style={{cursor: "pointer", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: "aliceblue", width: "50%", color: "#000"}} onClick={turnPlayOn}>
                          <strong>PLAY</strong>
                      </Button></>
                  :
                  <><Button style={{cursor: "pointer", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: "aliceblue", minWidth: "50%", color: "#000"}} onClick={turnRentOn}>
                      <strong>RENT</strong>
                  </Button>
                      <Button style={{cursor: "pointer", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: "#252324", minWidth: "50%", color: "#FFF"}} onClick={turnPlayOn}>
                          <strong>PLAY</strong>
                      </Button></>
              }
          </Button>
      )
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const getCurrentUrl=()=> {
        return window.location.href.slice(window.location.href.lastIndexOf("/"));
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {!userData.mobileno ? <MenuItem onClick={() => props.history.push({ pathname: '/mobileregistration' }, {"page": getCurrentUrl(), "item": props.item, "listItem": props.listItem})}>Sign In</MenuItem> : <>
                <MenuItem onClick={()=> props.history.push({pathname: "/myaccount"}, {"rent": rent})}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem></>}
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem  onClick={toggleDrawer('right', true)}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} aria-label={"show" + keys.length + "new items"} color="inherit">
                    <Badge badgeContent={keys.length} color="secondary">
                        <ShoppingCart />
                    </Badge>
                    <div style={{fontSize: 14, fontWeight: 500}}>Cart</div>
                </div>
            </MenuItem>
            <MenuItem onClick={userData.firstname ? handleProfileMenuOpen : ()=> props.history.push({ pathname: '/mobileregistration' }, {"rent": rent, "page": getCurrentUrl(), "listItem": props.listItem})}>
                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                    color="inherit"
                >
                    <Avatar style={{background: "#000", width: 30, height: 30}} src={`${ServerURL}/images/${userData.picture}`} />
                    <span style={{fontSize: 14, fontWeight: 500}}> {userData.firstname ? userData.firstname : "Login"} </span>
                </div>
            </MenuItem>
        </Menu>
    );
    
    const handleFetchNext = (value) => {
      if (value === 1) {
          setFetchNext(false);
          setFetchNext2(false);
      }
      else
          setFetchNext2(false);

      setChangeColor(false);
      setChangeColor2(false);
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}} className={classes.grow}>
            <AppBar position="fixed" style={{background: "#252324", boxShadow: "inherit"}}>
                <Toolbar>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon  style={{marginLeft: 20}} onClick={openDrawer} />
                        </IconButton>
                    </div>
                    <div style={{marginRight: 30, cursor: "pointer"}}>
                        <h3 onClick={()=> props.history.push({pathname: "/home"})}>
                            Games4U
                        </h3>
                    </div>
                    {playButton("desktop")}
                    <div style={{width: "100%", justifyContent: "center"}} className={classes.sectionDesktop}>
                        <div className={classes.search}
                             style={{width: "80%"}}
                        >
                            {showSearchBar()}
                        </div>
                    </div>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop} style={{width: "20%"}}>
                        <div style={{width: "100%", display: "flex"}}>
                            <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                                <IconButton onClick={toggleDrawer('right', true)} aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={keys.length} color="secondary">
                                        <ShoppingBasketOutlined/>
                                    </Badge>
                                </IconButton>
                            </div>
                            <div
                                style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar style={{color: "#252324", background: "#FFF", cursor: "pointer", width: 30, height: 30}} src={`${ServerURL}/images/${userData.picture}`} />
                                <span style={{fontSize: 14, fontWeight: "bold"}}> {userData.firstname} </span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 64,
                minHeight: 50,
                background: "#252324"
            }}
                 className={classes.sectionDesktop}
            >
                <div style={{width: "50%", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    {menuCategory2()}
                </div>

            </div>

            <div className={classes.sectionMobile} style={{marginBottom: 60}} />

            {renderMobileMenu}
            {renderMenu}
            {!drawer ?
                <></>
                :
                <>
                    <div style={{overflow: "hidden", borderTop: "10px solid #FFF", background: "#FFF", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 55, width: "100%", zIndex: 1}} className={classes.secAppbarMobile}>
                        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around"}}>

                            {playButton("mobile")}
                            <div style={{display: "flex", justifyContent: "flex-end", width: "33%"}} >
                                <CloseIcon style={{cursor: "pointer", marginBottom: 30, marginRight: 10}} onClick={()=> openDrawer()} />
                            </div>
                        </div>
                    </div>
                    {!fetchNext ?
                        <div className={classes.textStyles2} style={{marginTop: 70, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                            <span>
                                POPULAR CATEGORIES
                            </span>
                            <hr color={"cyan"} width="100%" />
                            {menuCategory()}
                            <div style={{width: "100%"}}>
                                <hr color={"cyan"} width="100%" />
                                <div style={{marginLeft: 20, marginTop: 20, display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                                    <a href={()=> false} style={{marginBottom: 10, cursor: "pointer"}}>Order Tracker</a>
                                    <a href={()=> false} style={{marginBottom: 10, cursor: "pointer"}}>Help & Customer Service</a>
                                    <a href={()=> false} style={{marginBottom: 10, cursor: "pointer"}}>Returns</a>
                                    {!Object.keys(userData).length
                                        ?
                                        <a href={()=> false} onClick={() => props.history.push({ pathname: '/mobileregistration' }, {"page": getCurrentUrl(), "item": props.item, "listItem": props.listItem})} style={{marginBottom: 10, cursor: "pointer"}}>Signup</a>
                                        :
                                        <a href={()=> false} onClick={()=> props.history.push({pathname: "/myaccount"}, {"rent": rent, "user": userData})} style={{marginBottom: 10, cursor: "pointer"}}>My Account</a>
                                    }
                                </div>
                            </div>
                        </div>
                        : !fetchNext2 ?
                        <div className={classes.textStyles2} style={{marginTop: 90, width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                            <div style={{width: "100%", display: "flex", alignItems: "center"}}>
                                <span onClick={()=> handleFetchNext(1)} style={{cursor: "pointer", color: changeColor ? "red" : "navy"}} >
                                    {
                                        changeColor
                                            ?
                                                <u onMouseOut={()=> setChangeColor(false)}>
                                                    Categories
                                                </u>

                                            :
                                            <div onMouseOver={()=> setChangeColor(true)}>Categories</div>
                                    }
                                </span>
                                <NavigateNext style={{fontSize: 12, margin: 5}}/>
                                <span style={{color: "red"}}>{catName}</span>
                            </div>
                            <hr color={"cyan"} width="100%" />
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                                <Button className={classes.textStyles2}
                                        style={{width: "90%", color: "#000", marginRight: 25, cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "space-between"}} onClick={()=> setDrawerItem("Consoles")} >
                                    <img
                                        alt={""}
                                        src={`${ServerURL}/images/${catName.includes("Sony") ? "G2.PNG" : "G1.PNG"}`}
                                        width="80"
                                        height="80"
                                    />
                                    <span>Consoles</span>
                                    <NavigateNext />
                                </Button>
                                <hr color={"aliceblue"} width="100%" />
                                <Button className={classes.textStyles2}
                                    style={{width: "90%", color: "#000", marginRight: 25, cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "space-between"}} onClick={()=> setDrawerItem("Accessories")} >
                                    <img
                                        alt={""}
                                        src={`${ServerURL}/images/${catName.includes("Sony") ? "Controller One.jpg" : "nithodrivepro.webp"}`}
                                        width="80"
                                        height="80"
                                    />
                                    <span>Accessories</span>
                                    <NavigateNext />
                                </Button>
                                <hr color={"aliceblue"} width="100%" />
                                <Button className={classes.textStyles2}
                                        style={{width: "90%", color: "#000", marginRight: 25, cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "space-between"}} onClick={()=> setDrawerItem("Games")} >
                                    <img
                                        alt={""}
                                        src={`${ServerURL}/images/${catName.includes("Sony") ? "ps31.jpg" : "ps35.jpg"}`}
                                        width="80"
                                        height="80"
                                    />
                                    <span>Games</span>
                                    <NavigateNext />
                                </Button>
                                <hr color={"aliceblue"} width="100%" />
                            </div>
                        </div>
                            :
                            <div style={{display: "flex", flexDirection: "column", marginTop: 90, width: "100%"}} className={classes.textStyles2}>
                                <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                                    <div style={{width: "100%", display: "flex", alignItems: "center"}}>
                                        <span onClick={()=> handleFetchNext(1)} style={{cursor: "pointer", color: changeColor ? "red" : "navy"}} >
                                            {
                                                changeColor
                                                    ?
                                                    <u onMouseOut={()=> setChangeColor(false)}>
                                                        Categories
                                                    </u>
                                                    :
                                                    <div onMouseOver={()=> setChangeColor(true)}>Categories</div>
                                            }
                                        </span>
                                        <NavigateNext style={{fontSize: 12, margin: 5}}/>
                                        <span onClick={()=> handleFetchNext(2)} style={{cursor: "pointer", color: changeColor2 ? "red" : "navy"}} >
                                            {
                                                changeColor2
                                                    ?
                                                    <u onMouseOut={()=> setChangeColor2(false)}>
                                                        {catName}
                                                    </u>
                                                    :
                                                    <div onMouseOver={()=> setChangeColor2(true)}>{catName}</div>
                                            }
                                        </span>
                                        <NavigateNext style={{fontSize: 12, margin: 5}}/>
                                        <span style={{color: "red"}}>{product}</span>
                                    </div>
                                    <hr color={"cyan"} width="100%" />
                                </div>
                                {showCategoryData()}
                            </div>
                    }
                </>
            }
            {!drawer ?<div className={classes.sectionMobile} style={{width: "100%"}}>
                {showSearchBar()}
            </div> : <></>}

            <div>

                <React.Fragment key={'right'}>

                    <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                        {list('right')}
                    </Drawer>
                </React.Fragment>

            </div>
            <div>

                <React.Fragment key={'left'}>

                    <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                        {list1('left')}
                    </Drawer>
                </React.Fragment>

            </div>
        </div>
    );
}