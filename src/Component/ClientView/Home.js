import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import {getData, ServerURL} from "../FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";
import { Grid } from "@material-ui/core";
import useStyles from "./Css";
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

export default function Home(props) {
    const classes = useStyles();
    const [listConsole, setListConsole] = useState([]);
    const [listCategory, setListCategories] = useState([]);
    const [listAccessory, setAccessory] = useState([]);
    const [listGame, setListGame] = useState([]);
    const [drawer, setDrawer] = useState(false);
    const [rent, setRent] = useState(localStorage.getItem("rent") ? JSON.parse(localStorage.getItem("rent")) : true);
    let cart = useSelector((state)=> state.cart);

    let settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    // let set = {
    //     dots: false,
    //     slidesToShow: getLength,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     responsive : [{
    //         breakpoint: 300,
    //         settings: {
    //             centerMode: true,
    //             display: "flex",
    //             width: 300,
    //             flexDirection: "column",
    //         }
    //     }]
    // };

    let itemsettings1 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
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
                    dots: true
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

    let itemsettings2 = {
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
                    dots: true
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

    let consoleres ={
        display: "flex",
        centerMode: false,
        flexDirection: "column",
        responsive :[{
            breakpoint:325,
            setting :{
                slidesToShow: 1,
                display: 'flex',
                centerMode: false,
                flexDirection: 'center',
                alignItems:'center',
                flexGrow: 1,
                maxWidth: '100 rem',
                height: 'auto',
            }
        }]
    }


    const fetchAllCategories = async () => {
        let list = await getData("categories/dispalyallcategory");
        setListCategories(list);
    };

    const fetchAllSubcategoryOffers = async () => {
        let list = await getData("subcategory/subcategoryoffers");
        setAccessory(list);
    };

    const fetchGamesOffers = async () => {
        let list = await getData("game/gamesoffers");

        setListGame(list);
    };

    const fetchConsoleOffers = async () => {
        let list = await getData("accessories/displayall");
        setListConsole(list);
    };

    const showSlider = () => {
        return listCategory.map((item) => {
            return (
                <div>
                    <img alt={""} src={`${ServerURL}/images/${item.ad}`} width="100%" />
                </div>
            );
        });
    };

    const turnRentOn=()=> {
        localStorage.setItem("rent", "true");
        setRent(true);
        return true;
    }
    const turnPlayOn=()=> {
        localStorage.setItem("rent", "false");
        setRent(false);
        return true;
    }

    const openDrawer=()=> {
        setDrawer(!drawer);
    }

    const showCategories = () => {
        return listCategory.map((item) => {
            return (

                <div
                    style={{
                        // border: "1px solid #ecf0f1",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        padding: 10,
                        margin: 5,
                        cursor:'pointer'
                    }}
                    onClick={()=> props.history.push({pathname:'/consolelist'}, {categoryid: item.categoryid, "rent": rent })}
                >
                    <img alt={""} src={`${ServerURL}/images/${item.icon}`} {...consoleres} width= '40%' style={{justifyContent:'center', alignItems:'center',display:"wrap"}} />
                    <div style={{ fontSize: 15, fontWeight: "bold", padding: 10 }}>
                        {item.categoryname.toUpperCase()}
                    </div>
                </div>
            );
        });
    };

    const showOffers = () => {
        return listAccessory.map((item) => {
            return (
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
                                 onClick={() =>
                                     props.history.push(
                                         { pathname: "/productview" },
                                         { product: item, "rent": rent, "listItem": listAccessory}
                                     )
                                 } className={classes.imageView}>
                                <img alt={""} src={`${ServerURL}/images/${item.picture}`} width="150" />
                            </div>
                            <div style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
                                {item.subcategoryname.length <= 20
                                    ? item.subcategoryname.toUpperCase()
                                    : item.subcategoryname.toUpperCase().substring(0, 18) + ".."}
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
            );
        });
    };


    const showGamesOffers = () => {
        return listGame.map((item) => {
            return (
                <div
                    style={{
                        // border: "1px solid #ecf0f1",
                        width: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        padding: 10,
                        margin: 5,
                    }}
                >
                    <Paper elevation={3} className={classes.paperstyle}>
                        <div style={{margin: 0, padding:10, cellSpacing: "30px", cellPadding: "100px"}}
                             onClick={() => goToItem(item, listGame)} className={classes.imageView}>
                            <img alt={""} src={`${ServerURL}/images/${item.picture}`} width="150" />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
                                {item.gamename.toUpperCase()}
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
                        </div>
                    </Paper>
                </div>
            );
        });
    };

    const showConsoleOffers = () => {
        return listConsole.map((item) => {
            return (
                <div
                    style={{
                        // border: "1px solid #ecf0f1",
                        width: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        padding: 10,
                        margin: 5,
                    }}
                >
                    <Paper elevation={3} className={classes.paperstyle}>
                        <div onClick={() =>
                            props.history.push(
                                { pathname: "/productview" },
                                { product: item, "rent": rent, "listItem": listConsole }
                            )
                        } className={classes.imageView}>
                            <img alt={""} src={`${ServerURL}/images/${item.picture}`} width="150" />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
                                {item.accessoryname.toUpperCase()}
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
                        </div>
                    </Paper>
                </div>
            );
        });
    };

    const goToItem = (item, getItem) => {

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
        fetchAllCategories().then(r=> 0);
        fetchAllSubcategoryOffers().then(r=> 0);
        fetchGamesOffers().then(r=> 0);
        fetchConsoleOffers().then(r=> 0);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{overflow: "hidden"}}>
            <Header rpButton={true} sendData={openDrawer} turnRentOn={turnRentOn} turnPlayOn={turnPlayOn} rent={rent} history={props.history} />
            {!drawer?<><div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ width: "100%" }}>
                    <Slider {...settings}>{showSlider()}</Slider>
                </div>
            </div>

            <div className={classes.root}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 30,
                            color: "#636e72",
                            fontWeight: "normal",
                            display: "flex",
                            letterSpacing: "1px",
                            fontFamily: 'Georgia,Times,"Times New Roman",serif',
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                        }}
                    >
                        TOP CATEGORIES
                    </div>
                    <Grid item xs={12}>

                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
                                {showCategories()}
                            </div></Grid>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 30,
                            color: "#636e72",
                            fontWeight: "normal",
                            display: "flex",
                            letterSpacing: "1px",
                            fontFamily: 'Georgia,Times,"Times New Roman",serif',
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        TOP OFFERS CONSOLE
                    </div>
                    <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <div style={{ width: "98%" }}>
                            <Slider {...itemsettings2}> {showOffers()}</Slider>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 30,
                            color: "#636e72",
                            fontWeight: "normal",
                            display: "flex",
                            letterSpacing: "1px",
                            fontFamily: 'Georgia,Times,"Times New Roman",serif',
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        TOP OFFERS GAMES
                    </div>
                    <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                    <div
                        style={{
                            // width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <div style={{ width: "98%" }}>
                            <Slider {...itemsettings1}>  {showGamesOffers()}</Slider>
                        </div>

                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 28,
                            color: "#636e72",
                            fontWeight: "normal",
                            display: "flex",
                            letterSpacing: "1px",
                            fontFamily: 'Georgia,Times,"Times New Roman",serif',
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        TOP OFFER ACCESSORIES
                    </div>
                    <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <div style={{ width: "98%" }}>
                            <Slider {...itemsettings2}>  {showConsoleOffers()}</Slider>
                        </div>
                    </div>
                </div>
            </div>
            <Footer history={props.history}/></>:<></>}
        </div>
    );

}
