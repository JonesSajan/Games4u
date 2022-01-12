import React, {useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({

  orange: {
    color:'#FFF',
    background:'#252324',
    width: theme.spacing(4),
    height: theme.spacing(4),
},

}));

export default function QtySpinner (props) {
  const classes = useStyles();
  const [pageRender, setPageRender] = useState(false);
  const [value,setValue]=useState(props.value)
 
  const handleIncrement=(value, item)=>{
      let c = value + 1
      setValue(c)
      props.onChange(c);
      setPageRender(!pageRender)
  }

  const handleDecrement=(value, item)=>{
    let c=value-1;
    if(c>=0)
    {setValue(c)
      props.onChange(c)
    //  setPageRender(!pageRender)
    }
    
  }
  useEffect(function () {
    setValue(props.value)
  },[props.value]);
  return(<div>
    
    {value===0?(<div style={{alignItems:'center', display:'flex',flexDirection:'row'}}>
      <Button variant="contained" style={{background:'#252324',color:'#FFF',fontSize:12,width:180}} onClick={()=>handleIncrement(value)}>
        ADD TO CART
        </Button>
        </div>):(<div style={{alignItems:'center', display:'flex',flexDirection:'row'}}><Avatar  onClick={()=>handleDecrement(value)} style={{marginRight:15 }} className={classes.orange} >-</Avatar>
    <div style={{display:'flex',justifyContent:'center',fontSize:16,fontWeight:'bold',width:15}}>{value}</div>
    <Avatar onClick={()=>handleIncrement(value)} style={{marginLeft:15}} className={classes.orange}>+</Avatar></div>)}
    </div>


  )
}