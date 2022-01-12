import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./Css";
import Button from "@material-ui/core/Button";

export default function SlotSelector(props) {
    const classes = useStyles();
    const totalSlots =["10AM - 11AM", "11AM - 12PM", "12PM - 01PM", "01PM - 02PM", "02PM - 03PM", "03PM - 04PM", "4PM - 05PM", "05PM - 06PM", "06PM - 07PM", "07PM - 08PM"];
    const [item, setItem] = useState(props.item);
    const [timeSlot, setTimeSlot] = useState([]);
    const[value, setValue] = useState(props.value);

    const selectSlot=(id)=> {
        if (document.getElementById(id).className === classes.tsBtn) {
            document.getElementById(id).className = classes.tsBtnActive;
            timeSlot.push(document.getElementById(id).innerText);

            props.selectSlot(document.getElementById(id).innerText, "push");
            let c = value+1;
            setValue(c)
            props.onChange(c);
        }
        else {
            document.getElementById(id).className = classes.tsBtn;
            let index = timeSlot.indexOf(document.getElementById(id).innerText);
            if (index !== -1) {
                timeSlot.splice(index, 1);
            }
            props.selectSlot(document.getElementById(id).innerText, "pop");
            let c=value-1;
            if(c>=0)
            {setValue(c)
                props.onChange(c)
            }
        }
    }

    const setSlots = () => {
        return totalSlots.map((items, index)=> {
            return (
                <Grid item xs>
                    <button disabled={!item.slotsavailable.includes(items)} id={index} onClick={()=> selectSlot(index)} className={props.cart[item.gamename.concat(" - to play")] ? props.cart[item.gamename.concat(" - to play")].slotsSelected.includes(items) ? classes.tsBtnActive : classes.tsBtn : !item.slotsavailable.includes(items) ? classes.tsBtnDisabled : classes.tsBtn}>
                        {items}
                    </button>
                </Grid>
            )
        })
    }

    useEffect(function () {
        setValue(props.value);
        setItem(props.item);
        setTimeSlot(props.rent === false ? localStorage.getItem("cart") ? Object.keys(JSON.parse(localStorage.getItem("cart"))).length ? Object.keys(JSON.parse(localStorage.getItem("cart"))).includes(item.gamename.concat(" - to play")) ? JSON.parse(JSON.parse(localStorage.getItem("cart"))[item.gamename.concat(" - to play")].slotsSelected) : [] : [] : [] : []);
        // eslint-disable-next-line
    },[props.value, props.item]);

    return (
        <div>
            <Grid container spacing={0} >
                {setSlots()}
            </Grid>

            <div style={{marginTop: 30, marginBottom: 30, alignItems:'center', display:'flex',flexDirection:'row'}}>
                {
                    timeSlot.length ?
                        <Button variant="contained"
                                style={{background: '#1e6b7b', color: '#FFF', fontSize: 12, width: 180}}>
                            SHOW CART
                        </Button>
                        :
                        <p style={{color: "darkcyan"}}>"Select from available slots to reserve your seat."</p>
                }

            </div>
        </div>
    )
}