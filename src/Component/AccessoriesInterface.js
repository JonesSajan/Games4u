import React, { useState,useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar'
import swal from "sweetalert"
import {isBlank} from "./Checks"
import swalhtml from "@sweetalert/with-react"
import renderHTML from "react-render-html"
import { makeStyles } from '@material-ui/core/styles';
import {getData,postDataAndImage,postData} from "./FetchNodeServices"
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
    root: {
        height:750,
        width:'auto',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
         
    },
    subdiv:{
        padding:20,
        width:700,
        marginTop:20,
        

    },
    input: {
        display: 'none',
      },

  }));

export default function AccessoriesInterface(props)
    {
        const classes = useStyles();
        const [categoryId,setCategoryId]=useState('')
        const [SubCategoryId,setSubCategoryId]=useState('')
        const [AccessoryName,setAccessoryName]=useState('')
        const [Description,setDescription]=useState('')
        const [Price,setPrice]=useState('')
        const [Picture,setPicture]=useState({bytes:'',file:'/noimage.JFIF'})
        const [Stock,setStock]=useState('')
        const [Rented,setRented]=useState('')
        const [Rentamt,setRentamt]=useState('')
        const [offer, setOffer] = useState("");

        const [listCategory, setListCategory] = useState([]);
        const [listSubCategory, setListSubCategory] = useState([]);

        const handleCategoryChange=async(event)=>{
            setCategoryId(event.target.value)
            var body={categoryid:event.target.value}
            var result = await postData("subcategory/displaysubcategorybycategoryid",body);
            setListSubCategory(result);
              }

        const fetchAllCategory = async () => {
          var result = await getData("categories/dispalyallcategory");
          setListCategory(result);
        };
        useEffect(function () {
          fetchAllCategory();
        }, []);
      
        const fillCategory = () => {
          return listCategory.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
          });
        };
      
        const fillSubCategory = () => {
            return listSubCategory.map((item) => {
              return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
            });
          };
        




        const handlePicture=(event)=>{
            setPicture({bytes:event.target.files[0],
                file:URL.createObjectURL(event.target.files[0])})

    }

    const handleClick=async()=>{

        var error=false
        var msg="<div>"
        if(isBlank(categoryId))
        {error=true
            msg+="<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(SubCategoryId))
        {error=true
            msg+="<font color='#e74c3c'><b>Category Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(AccessoryName))
        {error=true
            msg+="<font color='#e74c3c'><b>Category Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(Description))
        {error=true
            msg+="<font color='#e74c3c'><b>Sub Category Description Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(Price))
        {error=true
            msg+="<font color='#e74c3c'><b>Price Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(Picture.bytes))
        {error=true
            msg+="<font color='#e74c3c'><b>Please Select Category Icon..</b></font><br>"
        }
        if(isBlank(Stock))
        {error=true
            msg+="<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(Rented))
        {error=true
            msg+="<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(Rentamt))
        {error=true
            msg+="<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>"
        }

        if(error)
        {
            swalhtml(renderHTML(msg))
        }
        else{

        var formData= new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",SubCategoryId)
        formData.append("accessoryname",AccessoryName)
        formData.append("description",Description)
        formData.append("price",Price)
        formData.append("icon",Picture.bytes)
        formData.append("stock",Stock)
        formData.append("rented",Rented)
        formData.append("rentamt",Rentamt)
        formData.append("offer",offer)
    

        var config = {headers:{"content-type":"multipart/form-data"}}
        var result = await postDataAndImage('accessories/addnewaccessories',formData,config)
        if(result){
            swal({
                title: "Accessories Submitted Successfully",
                icon: "success",
                dangerMode: true,
            })
        }
    }
}
    return(<div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    {/* Heading(Category Interface) */}
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
                            Accessories Interface
                        </div>
                    </Grid>
                    
                    {/* Text Box (Category Name) */}
                    <Grid item xs={12}>
                    <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-category`">
                Category ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-category"
                id="demo-simple-select-outlined-category"
                //value={age}
                onChange={(event)=>handleCategoryChange(event)}
                label="Category ID"
              >
                {fillCategory()}
              </Select>
            </FormControl>

                    </Grid>

                    {/* Text Box (Category Description) */}
                    <Grid item xs={12}>
                    <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-subcategory`">
                SubCategory ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-subcategory"
                id="demo-simple-select-outlined-subcategory"
                //value={age}
                onChange={(event)=>setSubCategoryId(event.target.value)}
                label="SubCategory ID"
              >
                {fillSubCategory()}
              </Select>
            </FormControl>

                    </Grid>

                    <Grid item xs={12}>
                        <TextField onChange={(event)=>setAccessoryName(event.target.value)} label="Accessory Name" variant="outlined" fullWidth/>
                    </Grid>

                    {/* Text Box (Category Description) */}
                    <Grid item xs={12}>
                        <TextField onChange={(event)=>setDescription(event.target.value)} label="Accessory Description" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={(event)=>setRented(event.target.value)} label="Rented" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField onChange={(event)=>setRentamt(event.target.value)} label="Rent Amount" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
                    </Grid>

                    {/* Text(Upload Category Icon) */}
                    <Grid item xs={6}>
                        <span style={{fontSize:16, fontWeight:400}}>Upload Category Icon</span>
                            <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                {/* Upload Button */}
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                                </IconButton>
                                </label>
                            </Grid>

                            {/* Image Frame */}
                            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Avatar variant="rounded" src={Picture.file} style={{width:60, height:60}}/>

                            </Grid>

                            {/* Save Button */}
                            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Button onClick={()=>handleClick()} fullWidth variant='contained' color='primary'>Save</Button>

                            </Grid>

                            {/* Reset Button */}
                            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Button  fullWidth variant='contained' color='secondary' >Reset</Button>

                            </Grid>
                </Grid>
            </div>
        </div>
        
    )
}