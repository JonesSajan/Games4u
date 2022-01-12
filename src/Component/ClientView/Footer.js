import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./Css";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EmailIcon from "@material-ui/icons/Email"
import Smartphone from "@material-ui/icons/Smartphone";
import Divider from "@material-ui/core/Divider";
import {getData} from "../FetchNodeServices";
import {LocalShipping, SportsEsports, VideogameAsset} from "@material-ui/icons";
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcons from "@material-ui/icons/Twitter";

export default function Footer(props) {

    const [listCategory, setListCategory] = useState([]);
    const classes = useStyles();

    const fetchAllCategory = async () => {
        let list = await getData("categories/dispalyallcategory");
        setListCategory(list);
    };

    const showCategory = () => {
        return listCategory.map((item) => {
            return <div onClick={()=> props.history.push({pathname: "/consolelist"}, {categoryid: item.categoryid})} className={classes.contentLink}><ArrowForwardIosIcon style={{fontSize: 12}}/>{item.categoryname}</div>
        });
    };

    useEffect(function () {
        fetchAllCategory().then(r=>0);
    }, []);

    return (
        <div style={{overflow: "hidden", marginTop: 20}}>
            <div className={classes.rootFooter}>

                <Grid container>
                    <Grid item xs={12} sm={3} className={classes.gridContentFooter}>

                        <div style={{display: "flex", flexDirection: "column", margin: 20}}>
                            <div className={classes.heading}>
                                MOST POPULAR CATEGORIES
                            </div>
                            <div>
                                {showCategory()}
                            </div>
                            <div
                                style={{
                                    marginTop: 130,
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "left",
                                    textAlign: "left",
                                    color: "#FFF"
                                }}
                            >
                                <VideogameAsset fontSize={"large"} style={{marginRight:8}}  />
                                2500+ GAMES
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={3} className={classes.gridContentFooter}>

                        <div style={{display: "flex", flexDirection: "column", margin: 20}}>

                            <div className={classes.heading}>
                                CUSTOMER SERVICES
                            </div>

                            <div>
                                <div className={classes.contentLink}><ArrowForwardIosIcon style={{fontSize: 12}}/>Terms & Condition</div>
                                <div className={classes.contentLink}><ArrowForwardIosIcon style={{fontSize: 12}}/>FAQ</div>
                            </div>


                            <div
                                style={{
                                    marginTop: 130,
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "left",
                                    textAlign: "left",
                                    width:175,
                                    color: "#FFF"
                                }}
                            >
                                <LocalShipping fontSize={"large"} style={{marginRight:8}} />
                                FREE SHIPPING
                            </div>

                        </div>

                    </Grid>

                    <Grid item xs={12} sm={3} className={classes.gridContentFooter}>

                        <div style={{display: "flex", flexDirection: "column", margin: 20}}>

                            <div className={classes.heading}>
                                VISIT
                            </div>

                            <div>
                                <div onClick={()=>props.history.push({pathname: "/home"})} className={classes.contentLink}><ArrowForwardIosIcon style={{fontSize: 12}}/>Home</div>
                                <div className={classes.contentLink}><ArrowForwardIosIcon style={{fontSize: 12}}/>Blog</div>
                                <div className={classes.contentLink}><ArrowForwardIosIcon style={{fontSize: 12}}/>Offers</div>
                            </div>

                            <div
                                style={{
                                    marginTop: 103,
                                    marginBottom: 20,
                                    display: "flex",
                                    justifyContent: "left",
                                    textAlign: "left",
                                    alignItems: "center",
                                    color: "#FFF"
                                }}
                            >
                                <SportsEsports fontSize={"large"} style={{marginRight:8}} />
                                GENUINE PRODUCTS
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={3} className={classes.gridContentFooter}>

                        <div style={{margin: 20}} className={classes.sectionDesktop}>
                            <Divider
                                orientation={"vertical"}
                                classes={{ root: classes.divider }}
                            />
                        </div>

                        <div style={{display: "flex", flexDirection: "column", margin: 20}}>

                            <div className={classes.heading}>CONTACT US</div>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 14, color: "white", marginTop: 10}}>
                                <div style={{display: "flex", alignItems: "center", marginTop: 2}}><Smartphone style={{fontSize: 14, marginRight: 2}}/>Phone : +91-XXXXXXXXXX</div>
                                <div style={{display: "flex", alignItems: "center", marginTop: 2}}><EmailIcon style={{fontSize: 14, marginRight: 2}} />Email : jonessajan3000@gmail.com</div>
                            </div>

                            <div style={{display: "flex", color: "#FFF", justifyContent: "space-between", marginTop: 5}}>
                                <FacebookIcon style={{fontSize: "xx-large"}} className={classes.contentLink} />
                                <YouTubeIcon style={{fontSize: "xx-large"}} className={classes.contentLink} />
                                <TwitterIcons style={{fontSize: "xx-large"}} className={classes.contentLink} />
                                <InstagramIcon style={{fontSize: "xx-large"}} className={classes.contentLink} />
                            </div>

                            <div>
                                <p style={{color: "#FFF", fontSize: 14}}>
                                    Games4U is your destination for new and used video games.
                                    Rent video games online for your favorite systems including
                                    PS4, Xbox One, Switch, PS3, Xbox 360, Wii U, 3DS, and more.
                                </p>
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <span className={classes.heading}>DOWNLOAD APP</span>
                                    <Grid item xs={3} style={{display:'flex',justifyContent:'left',alignItems:'left', marginRight: 25}}>
                                        <div className={classes.contentLink}> <img src={`/play_store.png`} alt={""} style={{ marginRight: 20 }} /> </div>
                                        <div className={classes.contentLink}> <img src={`/ios_store.png`} alt={""} />  </div>
                                    </Grid>
                            </div>

                        </div>
                    </Grid>
                </Grid>
            </div>
            <div
                style={{
                    padding: "5px",
                    fontSize: 13,
                    background: "#252324",
                    color: "#FFF",
                    border: "5px solid #252324",
                    textAlign: "center"
                }}
            >
                © 2021{" "}
                <a style={{color: "#000"}} target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/jones-sajan-b32130177/">
                JONES{" "}
                </a>{" "}
                <span style={{color: "#000"}}>Pvt. Ltd. </span>
                All Rights Reserved
            </div>
        </div>

    );
}