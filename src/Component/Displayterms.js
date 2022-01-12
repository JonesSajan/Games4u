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
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import {getData,postData} from "./FetchNodeServices"

import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"



import { isBlank } from "./Checks"
import renderHTML from "react-render-html"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
    },
    subdiv:{
       padding:20,
       width:700,
       marginTop:20,
       background:'#f1f2f6'
       },
     input: {
    display: 'none',
  },
formControl: {
    minWidth: 690,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Displayterms(props)
{ const[list,setList]=useState()
  const classes = useStyles();
  //////////////////////////Edit Form//////////////////////////////
  
  const [termsid,settermsid]=useState('')
  const [condition,setconditioned]=useState('')
        
      
  const handleDelete=async()=>{
    var body={termsid:termsid}
  var result=await postData("terms/deleteconditioned",body)
  if(result)
  {
   swal({
     title: "Data Deleted Successfully",
     icon: "success",
     dangerMode: true,
   })
  }
else
{
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
    if(isBlank(termsid))
    {error=true
    msg+="<font color='#b2bec3'><b> termsid Should not be blank...</b></font><br>";
    }
    if(isBlank(condition))
    {error=true
    msg+="<font color='#b2bec3'><b>conditioned termsid Should not be blank...</b></font><br>";
    }
    
    msg+="</div>"
    if(error)
    {
     swalhtml(renderHTML(msg))
    }
    else
    {
   var body={termsid:termsid,
     conditioned:condition,
   }
   
   var result=await postData('terms/editconditioned',body)
   
   if(result)
   { console.log(result)
    swal({
      title: "data Updated Successfully",
      icon: "success",
      dangerMode: true,
    })
   }
  }
 }
 
 


 const editFormView=()=>{
  return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
<Grid container spacing={1}>
<Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
 <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
     Terms & conditioned
 </div>
</Grid>
           
 <Grid item xs={12}>
     <TextField value={termsid} onChange={(event)=> settermsid(event.target.value)} label="ID" variant="outlined" fullWidth/>
      </Grid>


<Grid item xs={12} >
     <TextField value={condition} onChange={(event)=> setconditioned(event.target.value)} label="conditioned" variant="outlined" fullWidth/>
     </Grid>
 
    
</Grid>
    </div>
    </div> 
)

 }




  ////////////////////////////////////////////////////////////////////
///////////////////////////Edit Dialog ///////////////////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setOpen(true);
    settermsid(rowData.termsid)
    setconditioned(rowData.subconditioned)
  
  };

  const handleClose = () => {
    setOpen(false);
   
  };

  const showEditdialog=()=>{
    return (
      <div>
        
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete Terms & condition
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
  ///////////////////////////////////////////////////////////////////
const fetchAllGame=async()=>{
var result=await getData("terms/displayall")
setList(result)

}
useEffect(function(){
fetchAllGame()

},[])


function displayall() {
    return (
      <div>
      <MaterialTable
        title="Terms & condition"
        columns={[
          { title: 'termsid', field: 'termsid' },
          { title: 'Term & conditioned', field: 'conditioned' },
          
       
         
        ]}
        data={list}       
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Termsandconditioned',
            onClick: (event, rowData) =>handleClickOpen(rowData)
          }
        ]}
      />
      {showEditdialog()}
      </div>
    )
  }
  return( <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<div style={{width:800,marginTop:10,padding:3}}>
{displayall()}
</div>

  </div>
  )
  
}