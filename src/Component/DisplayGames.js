import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar'
import swal from "sweetalert"
import {isBlank} from "./Checks"
import swalhtml from "@sweetalert/with-react"
import renderHTML from "react-render-html"
import {ServerURL,postData,postDataAndImage,getData} from "./FetchNodeServices"
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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
      
      borderRadius:15,
      borderStyle:'solid',
  },

  input: {
      display: 'none',
    },

  formControl: {
      margin: theme.spacing(1),
      minWidth: 700,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayGames(props)
{ const [list,setList]=useState()
  const classes = useStyles();
//////////////////////Edit Form///////////////////////////////////////////////////
const [categoryId,setCategoryId]=useState('')
const [subCategoryId,setSubCategoryId]=useState('')
const [GameId,setGameId]=useState('')
const [GameName,setGameName]=useState('')
const [Description,setDescription]=useState('')
const [Price,setPrice]=useState('')
const [Picture,setPicture]=useState({bytes:'',file:'/noimage.JFIF'})
const [Stock,setStock]=useState('')
const [Rented,setRented]=useState('')
const [Rentamt,setRentamt]=useState('')
const [PictureSaveCancel,setPictureSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const [listCategory, setListCategory] = useState([]);
const [offer, setOffer] = useState("");
        const [listSubCategory, setListSubCategory] = useState([]);

        const handleCategoryChange=async(event)=>{
            setCategoryId(event.target.value)
            fillSubCategoryByCategoryId(event.target.value)
                    }
        const fillSubCategoryByCategoryId=async(cid)=>{
          var body={categoryid:cid}
          var result = await postData("subcategory/displaysubcategorybycategoryid",body);
          setListSubCategory(result);

        }            

        const fetchAllCategory = async () => {
          var result = await getData("categories/dispalyallcategory");
          setListCategory(result);
        };
        
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
      setPictureSaveCancel(true)
}

const handleDelete = async () => {
  var body = {gameid:GameId}
  var result = await postData("game/deletegame",body)
  if (result){
    swal({
        title: "Game Deleted Successfully ",
        icon: "success",
        dangerMode: true,
      })
}
else{
  swal({
    title: "Fail To Delete Record ",
    icon: "success",
    dangerMode: true,
  })
  }
}


const handleClick=async()=>{
  var error=false
  var msg="<div>"
  if(isBlank(categoryId))
  {error=true
      msg+="<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>"
  }
  if(isBlank(subCategoryId))
  {error=true
      msg+="<font color='#e74c3c'><b>Sub Category Id Should Not Be Blank..</b></font><br>"
  }
  if(isBlank(GameName))
  {error=true
      msg+="<font color='#e74c3c'><b>Game Name Should Not Be Blank..</b></font><br>"
  }
  if(isBlank(Description))
  {error=true
      msg+="<font color='#e74c3c'><b>Description Should Not Be Blank..</b></font><br>"
  }
  if(isBlank(Price))
  {error=true
      msg+="<font color='#e74c3c'><b>Description Should Not Be Blank..</b></font><br>"
  }
  if(isBlank(Stock))
    {error=true
        msg+="<font color='#e74c3c'><b>Stock Should Not Be Blank..</b></font><br>"
    }
    if(isBlank(Rented))
    {error=true
        msg+="<font color='#e74c3c'><b>Rented Should Not Be Blank..</b></font><br>"
    }
    if(isBlank(Rentamt))
    {error=true
        msg+="<font color='#e74c3c'><b>Rent Amount Should Not Be Blank..</b></font><br>"
    }

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
    var body={
      categoryid:categoryId,
      subcategoryid:subCategoryId,
      gamename:GameName,
      description:Description, 
      price:Price,   
      stock:Stock,
      rented:Rented,
      rentamt:Rentamt,
      offer:offer,
      gameid:getRowData.gameid
    }
      var result=await postData('game/editgame',body);
    
    if(result){
        swal({
            title: "Game Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
          fetchAllGame()

}
}
}
const handleCancelPicture=()=>{
  
  setPicture({bytes:"",file:`${ServerURL}/images/${getRowData.picture}`})
  setPictureSaveCancel(false)
}

const handleClickSavePicture=async()=>{
 
  var formData= new FormData()
  formData.append("gameid",GameId)
  formData.append("picture",Picture.bytes)

  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('game/editpicture',formData,config)
  if(result){
      swal({
          title: "Picture Updated Successfully",
          icon: "success",
          dangerMode: true,
        });
        setPictureSaveCancel(false)
      
}
}

const editFormView=()=>{
  return(<div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
            {/* Heading(Category Interface) */}
            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
                    Game Interface
                </div>
            </Grid>
            
       {/* Text Box (Category ID) */}
       <Grid item xs={12}>
                    <FormControl
              variant="outlined"
              fullWidth

            >
              <InputLabel id="demo-simple-select-outlined-category`">
                Category ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-category"
                id="demo-simple-select-outlined-category"
                value={categoryId}
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

            >
              <InputLabel id="demo-simple-select-outlined-subcategory`">
                SubCategory ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-subcategory"
                id="demo-simple-select-outlined-subcategory"
                value={subCategoryId}
                onChange={(event)=>setSubCategoryId(event.target.value)}
                label="SubCategory ID"
              >
                {fillSubCategory()}
              </Select>
            </FormControl>

                    </Grid>

            <Grid item xs={12}>
                <TextField value={GameName} onChange={(event)=>setGameName(event.target.value)} label="Game Name" variant="outlined" fullWidth/>
            </Grid>

            {/* Text Box (Category Description) */}
            <Grid item xs={12}>
                <TextField value={Description} onChange={(event)=>setDescription(event.target.value)} label="Game Description" variant="outlined" fullWidth/>
            </Grid>

            {/* Text Box (Price) */}
            <Grid item xs={4}>
                <TextField value={Price} onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
            </Grid>

            <Grid item xs={4}>
                <TextField value={Stock} onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
            </Grid>

                    <Grid item xs={4}>
                        <TextField value={Rented} onChange={(event)=>setRented(event.target.value)} label="Rented" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField value={Rentamt} onChange={(event)=>setRentamt(event.target.value)} label="Rent Amount" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField value={offer} onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
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
                        {PictureSaveCancel?<span><Button onClick={()=>handleClickSavePicture()} color="secondary">save</Button><Button color="primary" onClick={()=>handleCancelPicture()}>Cancel</Button></span>:<></>}
                    </Grid>
        </Grid>
    </div>
</div>

)
}


//////////////////////////////////////////////////////////////////////////////////

//////////////////////Edit Dialoge////////////////////////////////////////////////
const [open, setOpen] = React.useState(false);
const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);
  setCategoryId(rowData.categoryid)
  fillSubCategoryByCategoryId(rowData.categoryid)
  

  setSubCategoryId(rowData.subcategoryid)
  setGameId(rowData.gameid)
  setGameName(rowData.gamename)
  setDescription(rowData.description)
  setPrice(rowData.price)
  setStock(rowData.stock)
  setRented(rowData.rented)
  setRentamt(rowData.rentamt)
  setOffer(rowData.offer)
  setPicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
};

const handleClose = () => {
  setOpen(false);
  fetchAllGame();
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
              Edit/Delete Game
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleClick()}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={()=>handleDelete()}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {editFormView()}
      </Dialog>
    </div>
  );


}



//////////////////////////////////////////////////////////////////////////////////

const fetchAllGame=async()=>{
var result = await getData("game/displayall")
setList(result)
}


useEffect(function(){
    fetchAllGame()
    fetchAllCategory()
},[])

function displayAll() {
    return (
      <div>
      <MaterialTable
        title="Game List"
        columns={[
          { title: 'Category Id', field: 'categoryid' },
          { title: 'Sub Category Id', field: 'subcategoryid' },
          { title: 'Game Name', field: 'gamename' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price' },
          { title: 'Stock', field: 'stock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rent Amount', field: 'rentamt' },
          { title: 'Booking Date', field: 'bookingdate' },
          { title: 'Slots Booked', field: 'slotsbooked' },
          { title: 'Slots Available', field: 'slotsavailable' },
          { title: 'Picture', field: 'picture',
            render:rowData =>(<div><img alt={""} src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:'5'}} width='40' height='40' /></div>)}
        ]}
        data={ list }        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Game',
            onClick: (event, rowData) => handleClickOpen(rowData)
          }
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return (<div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItem:'center'}}>
      <div style={{width:900,marginTop:40,padding:3}}>
      {displayAll()}
      
      
      </div>
      </div>)
      }