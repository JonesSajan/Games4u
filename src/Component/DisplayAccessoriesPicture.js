import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import {isBlank} from "./Checks";
import renderHTML from "react-render-html" ;


import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { BrokenImageOutlined } from "@material-ui/icons";




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function DisplayGamesPicture(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [imageID,setImageID]=useState('')
const [categoryId,setCategoryId]=useState('')
const [subcategoryId,setSubCategoryId]=useState('')
const [accessoriesId,setAccessoriesId]=useState('')
const [image,setImage]=useState({bytes:'',file:'/noimage.png' })


const [imageSaveCancel,setImageSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const [listCategory,setListCategory]=useState([])
const [listSubCategory,setListSubCategory]=useState([])
const [listAccessories,setListAccessories]=useState([])




const handleImage=(event)=>{
    setImage({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setImageSaveCancel(true)
}

 

const handleDelete=async()=>{

  var body={imageid:imageID}
  var result=await postData("accessoriespicture/deleteaccessoriespicture",body)

  if(result){
    swal({
        title: "Accessories Picture Deleted Successfully",
        icon: "success",
        dangerMode: true,
      })
  }
  else{
    swal({
      title: "Fail to Deleted Record",
      icon: "success",
      dangerMode: true,
    })
  }

}


const handleClick=async()=>{
    var error=false
    var msg="<div>"
    if(isBlank(categoryId)){
      error=true
      msg+="<font color='#e74c3c'><b>CategoryId should not be blank..</b></font><br> "
  }
  if(isBlank(subcategoryId)){
    error=true
    msg+="<font color='#e74c3c'><b>SubCategoryId should not be blank..</b></font><br> "
  }
  if(isBlank(accessoriesId)){
    error=true
    msg+="<font color='#e74c3c'><b>Accessories Id should not be blank..</b></font><br> "
}
    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{

   var body={
    imageid:imageID,
    categoryid:categoryId,
    subcategoryid:subcategoryId,
    accessoriesid:accessoriesId
   
    
   }
   
    var result= await postData('accessoriespicture/editaccessoriespicturedata',body)
    if(result){
        swal({
            title: "Accessories Picture updated Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}


const handleCancelImage=()=>{
  setImageSaveCancel(false)
  setImage({btyes:"",file:`${ServerURL}/images/${getRowData.image}`})
}


const handleClickSaveImage=async()=>{

  var formData=new FormData()
  formData.append("imageid",imageID)
  formData.append("image",image.bytes)
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('accessoriespicture/editimage',formData,config)
  if(result){
    swal({
        title: "Image updated Successfully",
        icon: "success",
        dangerMode: true,
      })
      setImageSaveCancel(false)
  }
}


const editFormView=()=>{

  
  return(
    <div className={classes.root} >
        <div className={classes.subdiv} >
            <Grid container spacing={1}>

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                        Accessories Picture
                    </div>
                </Grid>
                
                
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-category">Category Id</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-category"
                        id="demo-simple-select-outlined-category"
                        value={categoryId}
                        onChange={(event)=>handleCategoryChange(event)}
                        label="Category Id">
                       {fillCategory()}
                      </Select>
                     </FormControl>
                  </Grid>

    
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory Id</InputLabel>
                       <Select
                        labelId="demo-simple-select-outlined-subcategory"
                        id="demo-simple-select-outlined-subcategory"
                        value={subcategoryId}
                        onChange={(event)=>handleSubCategoryChange(event)}
                        label="SubCategory Id">
                        {fillSubCategory()}
                       </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                           <InputLabel id="demo-simple-select-outlined-subcategory">Accessories Id</InputLabel>
                           <Select
                               labelId="demo-simple-select-outlined-subcategory"
                               id="demo-simple-select-outlined-subcategory"
                               value={accessoriesId}
                               onChange={(event)=>setAccessoriesId(event.target.value)}
                               label="Accessories Id">
                                {fillAccessories()}
                           </Select>
                       </FormControl>
                    </Grid>


               
                    <Grid item xs={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit Image
                      </span>
                    <input onChange={(event)=>handleImage(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                       <IconButton color="primary" aria-label="upload Image" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={image.file} className={{width:60,height:60}} />

                {imageSaveCancel?<span><Button onClick={()=>handleClickSaveImage()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelImage()} >Cancel</Button></span>:<></>}

                </Grid>


                    
            </Grid>

        </div>
    
    </div>
)



}






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////Edit Dialog//////////////////////////////////////////////////////////


  
const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);

  setImageID(rowData.imageid)
  setCategoryId(rowData.categoryid)
  fillSubCategoryByCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  fillAccessoriesBySubCategoryId(rowData.subcategoryid)
  setAccessoriesId(rowData.accessoriesid)
  setImage({bytes:"",file:`${ServerURL}/images/${rowData.image}`})
  
 };

const handleClose = () => {
  setOpen(false);
  fetchAllAccessoriesPicture()
};

const showEditDialog=()=>{

  return (
    <div>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Accessories Picture 
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>

          </Toolbar>
        </AppBar>

        {editFormView()}
        
      </Dialog>
    </div>
  );


}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const fetchAllAccessoriesPicture=async()=>{
        var result=await getData("accessoriespicture/displayall")
        setList(result)
    
    }

    const fetchAllCategory=async()=>{
      var result=await getData("categories/displayall")
      setListCategory(result)
  
    }

  const handleCategoryChange=async(event)=>{
      setCategoryId(event.target.value)
      fillSubCategoryByCategoryId(event.target.value)
      
  } 

  const handleSubCategoryChange=async(event)=>{
    setSubCategoryId(event.target.value)
    fillAccessoriesBySubCategoryId(event.target.value)
    
  } 

  const fillAccessoriesBySubCategoryId=async(cid)=>{
    var body={subcategoryid:cid}
    var result= await postData("accessories/displayallaccessoriesbysubcategoryid",body)
    setListAccessories(result);

  }


  const fillSubCategoryByCategoryId =async(cid)=>{
    var body={categoryid:cid}
      var result= await postData("subcategory/displaysubcategorybycategoryid",body)
      setListSubCategory(result);

  }


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

const fillAccessories=()=>{
    return listAccessories.map((item)=>{
        return(
            <MenuItem value={item.accessoriesid}>{item.accessoriesname}</MenuItem>
        )
    })
}


    
    useEffect(function(){
        fetchAllAccessoriesPicture()
        fetchAllCategory()
    
    },[])
    
    
function displayAll() {
    return (
      <div>
      <MaterialTable
        title="Accessories Picture"
        columns={[
          { title: 'Id', field: 'imageid' },
          { title: 'CategoryId', field: 'categoryid' },
          { title: 'SubCategoryId', field: 'subcategoryid' },
          { title: 'AccessoriesId', field: 'accessoriesid' },
          { title: 'Image', field: 'image',
           render: rowData =><div><img src={`${ServerURL}/images/${rowData.image}`} style={{borderRadius:5}} width='40' height='40'/></div> },
          
        ]}

        data={list} 
        
        
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Accessories Picture',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }

  return(

    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}} >
      <div style={{width:900,marginTop:10,padding:3}}>
      {displayAll()}
      </div>
    </div>
    ) 


}
