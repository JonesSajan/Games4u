import React,{ useState,useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postDataAndImage,getData,postData} from "./FetchNodeServices"
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from "./Checks"
import renderHTML from "react-render-html" 

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        width:700,
        marginTop:20,
        background:'#FFF'
    },
    input: {
        display: 'none',
    },
}));


  export default function GamesPicture(props)
  { const classes =useStyles();
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryId,setSubCategoryId]=useState('')
    const [gameId,setGameId]=useState('')
    const [image,setImage]=useState({bytes:'',file:'/noimage.png' })


    
    const [listCategory,setListCategory]=useState([])
    const [listSubCategory,setListSubCategory]=useState([])
    const [listGame,setListGame]=useState([])

    const handleCategoryChange=async(event)=>{
        setCategoryId(event.target.value)
        var body={categoryid:event.target.value}
        var result= await postData("subcategory/displaysubcategorybycategoryid",body)
        setListSubCategory(result);

    } 

    const handleSubCategoryChange=async(event)=>{
        setSubCategoryId(event.target.value)
        var body={subcategoryid:event.target.value}
        var result= await postData("game/displaygamebysubcategoryid",body)
        setListGame(result);

    } 

    const fetchAllCategory=async()=>{
        var result=await getData("categories/dispalyallcategory")
        setListCategory(result)
    
    }
    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillCategory=()=>{
        return listCategory.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategory=()=>{
        return listSubCategory.map((item)=>{
            return(
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fillGame=()=>{
        return listGame.map((item)=>{
            return(
                <MenuItem value={item.gameid}>{item.gamename}</MenuItem>
            )
        })
    }


   

    
    const handleImage=(event)=>{
        setImage({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }
    
    const handleClick=async()=>{
        var error=false
        var msg="<div>"
        if(isBlank(categoryId)){
            error=true
            msg+="<font color='#e74c3c'><b>Category Id should not be blank..</b></font><br> "
        }
        if(isBlank(subcategoryId)){
            error=true
            msg+="<font color='#e74c3c'><b>subCategory Id should not be blank..</b></font><br> "
        }
        if(isBlank(gameId)){
            error=true
            msg+="<font color='#e74c3c'><b>Game Id should not be blank..</b></font><br> "
        }
        if(isBlank(image.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select  the Image.. </b></font><br> "
        }
        

        msg+="</div>"

        if(error){
            swalhtml(renderHTML(msg))
        }
        else{


        var formData=new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",subcategoryId)
        formData.append("gameid",gameId)
        formData.append("image",image.bytes)
        

        var config={headers:{"content-type":"multipart/form-data"}}
        var result= await postDataAndImage('gamepicture/addgamepic',formData,config)
        if(result){
            swal({
                title: "Games Picture Submitted Successfully",
                icon: "success",
                dangerMode: true,
              })
        }
    }
}



    return(
        <div className={classes.root} >
            <div className={classes.subdiv} >
                <Grid container spacing={1}>

                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                            Games Picture 
                        </div>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-category">Category Id</InputLabel>
                          <Select
                              labelId="demo-simple-select-outlined-category"
                               id="demo-simple-select-outlined-category"
                               //value={age}
                              onChange={(event)=>handleCategoryChange(event)}
                              label="Category Id">
                             {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                           <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory Id</InputLabel>
                           <Select
                               labelId="demo-simple-select-outlined-subcategory"
                               id="demo-simple-select-outlined-subcategory"
                               //value={age}
                               onChange={(event)=>handleSubCategoryChange(event)}
                               label="SubCategory Id">
                                {fillSubCategory()}
                           </Select>
                       </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                           <InputLabel id="demo-simple-select-outlined-subcategory">Game Id</InputLabel>
                           <Select
                               labelId="demo-simple-select-outlined-subcategory"
                               id="demo-simple-select-outlined-subcategory"
                               //value={age}
                               onChange={(event)=>setGameId(event.target.value)}
                               label="Game Id">
                                {fillGame()}
                           </Select>
                       </FormControl>
                    </Grid>


                   
                    <Grid item xs={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload Image</span>
                        <input onChange={(event)=>handleImage(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                           <IconButton color="primary" aria-label="upload Image" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={image.file} className={{width:60,height:60}} />
                    </Grid>

                    

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                        <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary" >Save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Button fullWidth variant="contained" color="secondary">Reset</Button>
                    </Grid>




                </Grid>

            </div>
        
        </div>
    )
}


