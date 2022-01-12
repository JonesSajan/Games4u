import React, {useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {getData, postData, ServerURL} from "../FetchNodeServices";
import renderHTML from "react-render-html";
import Header from "./Header";
import Footer from "./Footer";
import TodayIcon from "@material-ui/icons/Today";
import QtySpinner from "./QtySpinner";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {useDispatch, useSelector} from "react-redux";
import "react-tabs/style/react-tabs.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useStyles from "./Css"
import IconButton from "@material-ui/core/IconButton";
import SlotSelector from "./SlotSelector";
import swal from "sweetalert";
import {PeopleOutline, PersonOutline, SportsEsports} from "@material-ui/icons";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <IconButton
            className={className}
            style={{
                ...style,
                position: "absolute",
                zIndex: 1,
                width: 50,
                height: 50,
                marginLeft: 7,
            }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <IconButton
            className={className}
            style={{
                ...style,
                position: "absolute",
                zIndex: 1,
                width: 50,
                height: 50,
                marginRight: 7,
            }}
            onClick={onClick}
        />
    );
}

export default function ProductView(props) {
    let consoleSlider = useRef();
    const classes = useStyles();
    let settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
    };

    let item = props.history.location.state.product;

    const [startDate, setStartDate] = useState(getCurrentDate());
    const [endDate, setEndDate] = useState(addDays(1,getCurrentDate()));
    const [msg, setMsg] = useState("");
    const [documents, setDocuments] = useState("");
    const [tc, setTc] = useState("");
    const [itemPictures, setItemPictures] = useState([]);
    const [getImage, setImage] = useState(item);
    const [pageRender, setPageRender] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [slotSelected, setSlotSelected] = useState([]);
    const [player, setPlayer] = useState(1);
    const [rent, setRent] = useState(item.gamename ? JSON.parse(localStorage.getItem("rent")) : localStorage.setItem("rent", "true"));


    let dispatch = useDispatch();
    let cart = useSelector((state)=> state.cart);
    let keys = Object.keys(cart);

    const itemSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };


    function getCurrentDate()
    {
        let d=new Date()
        let dd=d.getDate()
        if(dd<=9)
        {
            dd="0"+dd;
        }

        let mm=d.getMonth()+1
        if(mm<=9)
        {
            mm="0"+mm;
        }

        let cd=d.getFullYear()+"-"+mm+"-"+dd

        return cd

    }
    function addDays(days,dt)
    { let d=new Date(dt)
        d.setDate(d.getDate()+days)

        let dd=d.getDate()
        if(dd<=9)
        {
            dd="0"+dd;
        }

        let mm=d.getMonth()+1
        if(mm<=9)
        {
            mm="0"+mm;
        }

        let cd=d.getFullYear()+"-"+mm+"-"+dd

        return cd
    }

    const handleDateDifference = (event, rentamt) => {
        setEndDate(event.target.value);
        let sd = new Date(startDate);
        let ed = new Date(event.target.value);
        const diffTime = Math.abs(ed - sd);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let totalamt = rentamt * diffDays;
        item['qtydemand'] = 1;
        item["time"] = "Day";
        item['startdate']=sd
        item['enddate']=ed
        item["duration"] = diffDays;
        item["time"] = "Day";
        dispatch({ type: "ADD_CART", payload: [item.gameid ? item.gamename.concat(rent ? " - on rent" : " - to play") : item.accessoryid ? item.accessoryname : item.subcategoryname, item] });

        setPageRender(!pageRender);
        setMsg(`Rent for ${diffDays} Days is Rs. ${totalamt}`);
    };

    const getPrice = (state, price) => {
        let days = 0;
        let cd=startDate
        let ed=endDate
        if (state === "Day"){
            days = 1;
            ed=addDays(days,cd)
        }
        else if (state === "Week"){
            days = 7;
            ed=addDays(days,cd)
        }
        else if (state === "Month"){ days = 30;
            ed=addDays(days,cd)
        }
        setEndDate(ed)
        item['qtydemand'] = 1;
        item["duration"] = days;
        item["time"] = "Day";
        item['startdate']=cd
        item['enddate']=ed

        dispatch({ type: "ADD_CART", payload: [item.gameid ? item.gamename.concat(" - on rent") : item.accessoryid ? item.accessoryname : item.subcategoryname, item] });

        setPageRender(!pageRender);
        setRefresh(!refresh);
        setMsg(`Rent for ${state} is Rs. ${price}`);
    };

    const turnRentOn=()=> {
        localStorage.setItem("rent", "true");
        setRent(true);
        return true
    }

    const turnPlayOn=(item)=> {
        if ("gamename" in item || !item) {
            localStorage.setItem("rent", "false");
            setRent(false);
            return true;
        }
        else {
            swal({
                title: "You can only book a game to play.",
                icon: "warning",
                dangerMode: true,
            });
        }
    }

    const fetchDocuments = async () => {
        let result = await postData("document/displayall");
        setDocuments(result[0].documents);
    };

    const fetchTC = async () => {
        let result = await getData("terms/displayall");
        setTc(result[0].conditioned);
    };

    const fetchProductPictures = async () => {
        let result = []
        if (item.gamename) {
            let body = {gameid: item.gameid};
            result = await postData(
                "gamepicture/displaypic",
                body
            );
        } else if (item.accessoryname) {
            let body = {accessoryid: item.accessoryid};
            result = await postData(
                "accessorypicture/displaypic",
                body
            );
        } else {
            let body = {subcategoryid: item.subcategoryid};
            result = await postData(
                "subcategorypicture/displaypic",
                body
            );
        }
        setItemPictures(result);
    };

    const selectSlot = (value, action) => {
        if (action === "push") {
            slotSelected.push(value);
        }
        else {
            let index = slotSelected.indexOf(value);
            if (index !== -1) {
                slotSelected.splice(index, 1);
            }
        }
    }

    const changeItem = (item, getItem) => {

        if ("gamename" in item) {

            if (cart[item.gamename + " - to play"]) {
                if (cart[item.gamename + " - on rent"]) {

                }
                else {
                    localStorage.setItem("rent", "false")
                    setRent(false);
                }
            }

            else if (cart[item.gamename + " - on rent"]) {
                localStorage.setItem("rent", "true")
                setRent(true);
            }

        }
        props.history.push({ pathname: "/productview" }, { product: item, "listItem": getItem});
    }
    
    useEffect(function () {
        setImage(item.picture);
        setRent(JSON.parse(localStorage.getItem("rent")));
        setSlotSelected(rent === false ? localStorage.getItem("cart") ? Object.keys(JSON.parse(localStorage.getItem("cart"))).length ? Object.keys(JSON.parse(localStorage.getItem("cart"))).includes(item.gamename.concat(" - to play")) ? JSON.parse(JSON.parse(localStorage.getItem("cart"))[item.gamename.concat(" - to play")].slotsSelected) : [] : [] : [] : []);
        fetchDocuments().then(r=>0);
        fetchTC().then(r=>0);
        fetchProductPictures().then(r=>0);
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [props.history.location.state.product]);
    ////////////////////tabs///////////////////



    const showOffers=()=> {
        let getItem = props.history.location.state.listItem
        let itemName = getItem[0].gamename  ? "game" : getItem[0].accessoryname ? "accessory" : "console";
        return (getItem).map((item)=> {
            return(
                    <div
                        style={{
                            //border: "1px solid #ecf0f1",
                            width: 200,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            // padding: 10,
                            margin: 5,
                        }}
                    >
                        <Paper elevation={3} className={classes.paperstyle}>
                            <div style={{margin: 0, padding:10, cellSpacing: "30px", cellPadding: "100px"}}
                                 onClick={()=> changeItem(item, getItem)} className={classes.imageView}>
                                <img alt={""} src={`${ServerURL}/images/${item.picture}`} width="150" />
                            </div>
                            <div style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
                                {itemName === "console" ?
                                    item.subcategoryname.length <= 20 ? item.subcategoryname.toUpperCase() : item.subcategoryname.slice(0, 18).toUpperCase() + ".."
                                    : itemName === "game" ?
                                        item.gamename.length <= 20 ? item.gamename.toUpperCase() : item.gamename.slice(0, 18).toUpperCase() + ".."
                                        : item.accessoryname.length <= 20 ? item.accessoryname.toUpperCase() : item.accessoryname.slice(0, 18).toUpperCase() + ".."
                                }
                            </div>
                            <div style={{ fontSize: 16, padding: 10 }}>
                                Day Price: <s>&#8377;{item.rentamt}</s>{" "}
                                <span>
                  <b>&#8377; {item.offer}</b>
                </span>
                            </div>
                            <div style={{ fontSize: 16, padding: 10 }}>
                <span style={{ color: "green" }}>
                  <b>You save </b>
                </span>
                                <b>&#8377; {item.rentamt - item.offer}</b>
                            </div>
                        </Paper>
                    </div>
            )}
        )
    }

    const findItemInCart =(item)=> {
        if(item === 0) {
            setPageRender(!pageRender);
            return 0;
        }
        let itemName = item.gameid ? item.gamename.concat(" - on rent") : item.accessoryid ? item.accessoryname : item.subcategoryname;
        for (let i=0; i<keys.length; i++) {
            if (itemName === keys[i]) {
                return cart[itemName].qtydemand;
            }
        }
        return 0;
    }


    const findSlotInCart =(item)=> {
        if(item === 0) {
            setPageRender(!pageRender);
            return 0;
        }
        for (let i=0; i<keys.length; i++) {
            if (item.gamename.concat(" - to play") === keys[i]) {
                return JSON.parse(cart[item.gamename.concat(" - to play")].slotsSelected).length;
            }
        }
        return 0;
    }

    const showTabs = (Description) => (
        <Tabs >
            <TabList style={{display: "flex"}}>
                <Tab
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        letterSpacing: 1,
                    }}
                >
                    Description
                </Tab>
                <Tab style={{ fontWeight: "bold", fontSize: 20, letterSpacing: 1 }}>
                    Terms & Condition
                </Tab>
                <Tab style={{ fontWeight: "bold", fontSize: 20, letterSpacing: 1 }}>
                    Documents
                </Tab>
            </TabList>

            <TabPanel>
                <h2>{Description}</h2>
            </TabPanel>
            <TabPanel>
                <div>{renderHTML(tc)}</div>
            </TabPanel>
            <TabPanel>
                <div>{renderHTML(documents)}</div>
            </TabPanel >
        </Tabs>
    );
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleQtyChangeRent = (value, item, duration = 1) => {
        let itemName = item.gameid ? item.gamename.concat(" - on rent") : item.accessoryid ? item.accessoryname : item.subcategoryname;
        if (value === 0) {
            dispatch({ type: "REMOVE_CART", payload: [itemName, item] });
        }
        else {

            item["qtydemand"] = value;
            item['duration'] = duration;

            let cd = getCurrentDate();

            item['startdate'] = cd;
            item['enddate'] = addDays(1, cd);
            item['time'] = 'Day';

            dispatch({ type: "ADD_CART", payload: [itemName, item] });
        }

        setPageRender(!pageRender);
    };

    const handleQtyChangePlay = (value, item) => {

        if (value === 0) {
            dispatch({ type: "REMOVE_CART", payload: [item.gamename + " - to play", item] });
            setSlotSelected([]);
        } else {


            item["qtydemandPlay"] = player;
            item['durationPlay'] = value;
            item['bookingdate'] = getCurrentDate();
            item['timePlay'] = 'hour';
            item['slotsSelected'] = JSON.stringify(slotSelected);

            dispatch({ type: "ADD_CART", payload: [item.gameid ? item.gamename+" - to play" : item.accessoryid ? item.accessoryname : item.subcategoryname, item] });
        }
        setPageRender(!pageRender);
    };

    const handlePlayerChange = (value) => {
        if (slotSelected.length) {
            setPlayer(value);
            item['qtydemandPlay'] = value;

            dispatch({ type: "ADD_CART", payload: [item.gameid ? item.gamename+" - to play" : item.accessoryid ? item.accessoryname : item.subcategoryname, item] });
            setPageRender(!pageRender)
        }

    }

    const productDetailsRent = () => {
        let rentamt = item.offer > 0 ? item.offer : item.rentamt;

        return (
            <div>
                <div
                    style={{
                        padding: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        letterSpacing: 1,
                    }}
                >
                    {item.gamename} {item.subcategoryname} {item.accessoryname}
                </div>

                <div style={{ fontSize: 16, padding: 10 }}>
                    Price:<s>&#8377;{item.rentamt}</s>{" "}
                    <span style={{ color: "green" }}>
            <b>&#8377; {item.offer}</b>
          </span>
                </div>

                <div style={{ padding: 10 }}>
                    {item.stock - item.rented > 0 ? (
                        <div>Availability:{item.stock - item.rented} in Stock</div>
                    ) : (
                        <div style={{fontSize: 20, fontWeight: "bold", color: "red"}}>Not available this time</div>
                    )}
                </div>

                {item.stock - item.rented ? <><div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                        onClick={() => getPrice("Day", rentamt)}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            width: 120,
                            padding: 10,
                            background: "#252324",
                            color: "#FFF",
                            margin: 10,
                        }}
                    >
                        <div>Day Price: </div>
                        <div>&#8377;{rentamt} </div>
                    </div>

                    <div
                        onClick={() => getPrice("Week", rentamt * 7)}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            width: 120,
                            padding: 10,
                            background: "#252324",
                            color: "#FFF",
                            margin: 10,
                        }}
                    >
                        <div>Week Price: </div>
                        <div>&#8377;{rentamt * 7} </div>
                    </div>

                    <div
                        onClick={() => getPrice("Month", rentamt * 30)}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            width: 120,
                            padding: 10,
                            background: "#252324",
                            color: "#FFF",
                            margin: 10,
                        }}
                    >
                        <div>Month Price: </div>
                        <div>&#8377;{rentamt * 30} </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        width: 400,
                    }}
                >
          <span>
            <TodayIcon />{" "}
          </span>
                    <span>Select Rent Duration</span>
                </div>

                <Grid item xs={12} sm={6} style={{display: "flex"}}>
                    <TextField
                        InputProps={{inputProps: { min: startDate} }}
                        id="date"
                        label="Start Date"
                        variant="outlined"
                        onChange={(event) => setStartDate(event.target.value)}
                        type="date"
                        value={startDate}
                        //defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="date"
                        InputProps={{inputProps: { min: startDate} }}
                        label="End Date"
                        variant="outlined"
                        type="date"
                        onChange={(event) => handleDateDifference(event, rentamt)}
                        value={endDate}
                        // defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <div style={{ padding: 10 }}>{msg}</div>

                <div style={{ padding: 10, marginBottom: 20 }}>

                    <QtySpinner
                        value={findItemInCart(item)}
                        onChange={(value) => handleQtyChangeRent(value, item)}
                        rent={rent}
                        slotsBooked={true}
                    />

                    </div></> :<></>}
            </div>
        );
    };

    const productDetailsPlay = () => {
        return (
            <div>
                <div
                    style={{
                        padding: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        letterSpacing: 1,
                    }}
                >
                    {item.gamename}
                </div>

                <div style={{ fontSize: 16, padding: 10 }}>
                    Price:<s>&#8377;{item.rentamt}</s>{" "}
                    <span style={{ color: "green" }}>
            <b>&#8377; {item.offer} / hr</b>
          </span>
                </div>
                {item.slotsavailable ? <>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <div style={{ padding: 10 }}>

                                <div>
                                    <div style={{marginBottom: 10}}>Select Play Date</div>
                                    <TextField
                                        id="date"
                                        InputProps={{inputProps: { min: startDate} }}
                                        label="Booking Date"
                                        variant="outlined"
                                        onChange={(event) => setStartDate(event.target.value)}
                                        type="date"
                                        value={startDate}
                                        // defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div style={{ padding: 10 }}>
                            <div >
                                <div style={{marginBottom: 10}}>
                                    Select Players
                                </div>
                                <div style={{display: "flex"}}>
                                    <button disabled={!slotSelected.length} onClick={()=> handlePlayerChange(1)} className={player === 2 || !slotSelected.length ? classes.tsBtn : classes.tsBtnActive}>
                                        <PersonOutline/><SportsEsports />
                                    </button>

                                    <button disabled={!slotSelected.length} onClick={()=> handlePlayerChange(2)} className={player === 2 ? classes.tsBtnActive : classes.tsBtn }>
                                        <SportsEsports /> <PeopleOutline/> <SportsEsports />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div style={{marginLeft: 10, marginTop: 20, fontSize: 16,}}>
                    Select Your Play Time
                </div>

                <div>
                    <SlotSelector value={findSlotInCart(item)} onChange={(value) => handleQtyChangePlay(value, item)} item={item} slotSelected={slotSelected} selectSlot={selectSlot} keys={keys} cart={cart} rent={rent}/>
                </div></> : <div style={{fontSize: 20, fontWeight: "bold", color: "red"}}>Not available this time</div>}
            </div>
        );
    };

    const openDrawer=()=> {
        setDrawer(!drawer);
    }

    const showProductPictures = () => {
        let arr = [];
        arr[0] = <div
            style={{
                padding: 10, display: "flex", justifyContent: "center", alignContent: "center"
            }}
            onMouseEnter={() => setImage(item.picture)}>
            <img alt={""}
                 src={`${ServerURL}/images/${item.picture}`}
                 width={56}
                 height={56}
            />
        </div>
        // eslint-disable-next-line
         itemPictures.map(function (item, index) {
            arr[index+1] =
                <div
                    style={{
                        padding: 10, display: "flex", justifyContent: "center", alignContent: "center"
                    }}
                    onMouseEnter={() => setImage(item.picture)}>
                    <img alt={""}
                         src={`${ServerURL}/images/${item.picture}`}
                         width={56}
                         height={56}
                    />
                </div>
        });
        return arr;
    };

    const handleNext = () => {
        consoleSlider.current.slickNext();
    };

    const handleBack = () => {
        consoleSlider.current.slickPrev();
    };

    return (
        <div style={{overflow: "hidden"}}>
            <Header item={item} slotSelected={slotSelected} sendData={openDrawer} turnRentOn={turnRentOn} turnPlayOn={turnPlayOn} history={props.history} goToItem={changeItem} deleteRentItem={handleQtyChangeRent} deletePlayItem={handleQtyChangePlay} listItem={props.history.location.state.listItem}/>
            {!drawer ?<> <div style={{ padding: 20 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <div
                            style={{
                                padding: 15,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img alt={""}
                                 src={`${ServerURL}/images/${getImage}`}
                                 width="300"
                                 height="300"
                            />
                        </div>
                        {itemPictures.length <4 ? (
                            <div
                                style={{
                                    marginBottom: 20,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "50%",
                                        marginBottom: 20,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {showProductPictures()}
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div style={{ marginLeft: 10, fontSize: "small" }}>
                                    <ArrowBackIosIcon onClick={() => handleBack()} />
                                </div>
                                <div
                                    style={{
                                        padding: "30px 10px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ width: 350 }}>
                                        <Slider {...settings} ref={consoleSlider}>
                                            {showProductPictures()}
                                        </Slider>
                                    </div>
                                </div>
                                <div style={{ marginRight: 10, fontSize: "small" }}>
                                    <ArrowForwardIosIcon onClick={() => handleNext()} />
                                </div>
                            </div>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {JSON.parse(localStorage.getItem("rent")) ? productDetailsRent() : productDetailsPlay()}
                    </Grid>
                </Grid>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginBottom: 20,
                        marginTop: 20
                    }}
                >
                    <div className={classes.activityHeading} style={{width: "100%", color: "#000"}}>
                        Related Products
                    </div>

                    <div style={{ width: "98%" }}>
                        <Slider {...itemSettings}> {showOffers()}</Slider>
                    </div>
                </div>

                <div>{showTabs(item.description)}</div>

            </div>
                <div>
                    <Footer history={props.history} />
                </div></> : <></>}
        </div>
    );
}
