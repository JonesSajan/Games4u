import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header"
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import { postData, getData, ServerURL } from "../FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";
import {useSelector} from 'react-redux'
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column'

  },
  paperstyle: {
    justifyContent: 'center',
    alignItems: "center",
    display: 'flex',
    padding: 10,
    width: 210,
    height: 310,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column'

  },
  imageview: {
    width: 150,
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 2,
    cursor: "pointer",

    "&:hover": {
      transform: "scale(1.25)",
      transition: "all 0.5s ease 0s",
    },
  },
  arrowstyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },

}))

export default function Consolelist(props) {
  const classes = useStyles();
  const [listConsole, setListConsole] = useState([]);
  const [listGame, setListGame] = useState([]);
  const [listAllConsole, setListAllConsole] = useState([]);
  const [listAllGame, setListAllGame] = useState([]);
  const [listAllAccessory, setListAllAccessory] = useState([]);
  const [listCategory, setListCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [listAccessory, setListAccessory] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [rent, setRent] = useState(JSON.parse(localStorage.getItem("rent")));
  let cart = useSelector((state)=> state.cart);
  let categoryid = props.history.location.state.categoryid


  let settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };


  const fetchallcategortad = async () => {
    let list = await getData('subcategory/displayall')
    setListCategories(list)
  }

  const openDrawer=()=> {

      setDrawer(!drawer);
  }

  const fetchCategoryName=async ()=> {
      let body = {categoryId: categoryid}
      let result = await postData("categories/findname",body);
      setCategoryName(result[0].categoryname.slice(result[0].categoryname.indexOf(" ")+1));
  }

  const fetchAllSubCategoriesByCategory = async () => {
    let body = { 'categoryid': categoryid }
    let list = await postData
    ('subcategory/displaysubcategorybycategoryid', body)
    setListConsole(list)

  }

  const fetchAllAccessoriesByCategory=async ()=> {
      let body = {categoryId: categoryid}
      let result = await postData("accessories/findaccessory",body);
      setListAccessory(result);
  }


  const fetchAllGamesByCategory = async()=>{
  let body = {value: categoryid}
  let list = await postData("game/searchgamesbycategory",body);
  setListGame(list);
}

  const fetchAllSubCategories = async () => {
    let list = await getData('subcategory/displayall')
    setListAllConsole(list)
  }

  const fetchAllAccessories=async ()=> {
    let result = await getData("accessories/displayall");
    setListAllAccessory(result);
  }

  const fetchAllGames = async()=>{
    let list = await getData("game/displayall");
    setListAllGame(list);
  }

  const turnRentOn=()=> {
    localStorage.setItem("rent", "true");
    setRent(true);
  }
  const turnPlayOn=()=> {
    localStorage.setItem("rent", "false");
    setRent(false);
  }


  const showslider = () => {
    return listCategory.map((item) => {
      return (
        <div>
          <img alt={""} src={`${ServerURL}/images/${item.ad}`} width='100%' height="300px" />
        </div>
      )
    })
  }

  const showItem = (Item) => {
    return (Item === "console" ? listConsole : Item === "game" ? listGame : listAccessory).map((item) => {

      return (
        <Grid item xs>

          <Paper elevation={3} className={classes.paperstyle}>

            <div className={classes.imageview} style={{cursor: "default"}}>
              <img alt={""} src={`${ServerURL}/images/${item.picture}`} width="150" />
            </div>

            <div style={{ fontSize: 16, padding: 10 }}>
              {(Item === "console" ? item.subcategoryname : Item === "game" ? item.gamename : item.accessoryname).length < 18 ? (Item === "console" ? item.subcategoryname : Item === "game" ? item.gamename : item.accessoryname).toUpperCase() : (Item === "console" ? item.subcategoryname : Item === "game" ? item.gamename : item.accessoryname).substring(0, 15) + ".."}
            </div>

            <div style={{ fontSize: 16, padding: 10 }}>
              Day Price: <s>&#8377; {item.rentamt}</s> <span><b> &#8377; {item.offer}</b></span>
            </div>


            <div style={{ fontSize: 16, padding: 10 }}>
              <span style={{ color: 'green' }}><b>
                You Save
              </b><span><b> &#8377; {item.rentamt - item.offer}</b></span></span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="contained" style={{background:'#252324',color:'#FFF',fontSize:12,width:180}} onClick={() => goToItem(item, Item === "console" ? listAllConsole : Item === "game" ? listAllGame : listAllAccessory) } >
                GOTO PRODUCT
              </Button>
            </div>
          </Paper>
        </Grid>
      )
    })
  }

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
    fetchAllSubCategoriesByCategory().then(r=> 0);
    fetchAllGamesByCategory().then(r=> 0);
    fetchAllAccessoriesByCategory().then(r=> 0);
    fetchAllSubCategories().then(r=> 0);
    fetchAllGames().then(r=> 0);
    fetchAllAccessories().then(r=> 0);
    fetchCategoryName().then(r=> 0);
    fetchallcategortad().then(r=> 0);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [props.history.location.state.categoryid])


  return (
      <div style={{overflow: "hidden"}}>
          <Header turnRentOn={turnRentOn} turnPlayOn={turnPlayOn} rent={rent} sendData={openDrawer} history={props.history}/>

    { !drawer ? <><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%' }}>
        <Slider{...settings}>{showslider()}</Slider>
      </div>
    </div>

        <div
            style={{
              fontSize: 28,
              color: "#636e72",
              fontWeight: "normal",
              display: "flex",
              letterSpacing: "2px",
              fontFamily: 'Georgia,Times,"Times New Roman",serif',
              justifyContent: "center",
              padding: 10,
            }}
        >
            {categoryName} Consoles
        </div>
        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
    <Grid container spacing={1} style={{textAlign: "-webkit-center"}}>
          {showItem("console")}
    </Grid>

        <div
            style={{
              fontSize: 28,
              color: "#636e72",
              fontWeight: "normal",
              display: "flex",
              letterSpacing: "2px",
              fontFamily: 'Georgia,Times,"Times New Roman",serif',
              justifyContent: "center",
              padding: 10,
            }}
        >
            {categoryName} Games
        </div>
        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
      <Grid container spacing={1} style={{textAlign: "-webkit-center"}}>
        {showItem("game")}
      </Grid>

          <div
              style={{
                  fontSize: 28,
                  color: "#636e72",
                  fontWeight: "normal",
                  display: "flex",
                  letterSpacing: "2px",
                  fontFamily: 'Georgia,Times,"Times New Roman",serif',
                  justifyContent: "center",
                  padding: 10,
              }}
          >
              {categoryName} Accessories
          </div>
          <Divider style={{ marginTop: 5, marginBottom: 5 }} />
      <Grid container spacing={1} style={{textAlign: "-webkit-center"}}>
        {showItem("accessory")}
      </Grid>
    <Footer history={props.history}/> </> : <></>}
  </div>
  )
}