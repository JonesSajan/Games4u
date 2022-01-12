import React, { useState,useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import swal from "sweetalert";
import { isBlank } from "./Checks";
import swalhtml from "@sweetalert/with-react";
import renderHTML from "react-render-html";


import { makeStyles } from "@material-ui/core/styles";
import { getData, postDataAndImage } from "./FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 750,
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    padding: 20,
    width: 700,
    marginTop: 20,
  },
  input: {
    display: "none",
  },
}));
export default function SubCategoryInterface(props) {
  const classes = useStyles();
  const [categoryId, setCategoryId] = useState("");
  const [SubCategoryName, setSubCategoryName] = useState("");
  const [SubCategoryDescription, setSubCategoryDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [icon, setIcon] = useState({ bytes: "", file: "/noimage.JFIF" });
  const [ad, setAd] = useState({ bytes: "", file: "/noimage.JFIF" });
  const [adStatus, setAdStatus] = useState("");
  const [stock, setStock] = useState("");
  const [rented, setRented] = useState("");
  const [rentamt, setRentamt] = useState("");
  const [offer, setOffer] = useState("");

  const [listCategory, setListCategory] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("categories/dispalyallcategory");
    setListCategory(result);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const showCategory = () => {
    return listCategory.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handleAd = (event) => {
    setAd({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleIcon = (event) => {
    setIcon({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleClick = async () => {
    var error = false;
    var msg = "<div>";
    if (isBlank(categoryId)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(SubCategoryName)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(SubCategoryDescription)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Sub Category Description Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(Price)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Price Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(ad.bytes)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Please Select Picture For Advertisment..</b></font><br>";
    }
    if (isBlank(icon.bytes)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Please Select Category Icon..</b></font><br>";
    }
    if (isBlank(adStatus)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Please Choose Ad Status..</b></font><br>";
    }
    msg += "</div>";
    if (isBlank(stock)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(rented)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(rentamt)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>";
    }

    if (error) {
      swalhtml(renderHTML(msg));
    } else {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryname", SubCategoryName);
      formData.append("description", SubCategoryDescription);
      formData.append("price", Price);
      formData.append("icon", icon.bytes);
      formData.append("ad", ad.bytes);
      
      formData.append("adstatus", adStatus);
      formData.append("stock", stock);
      formData.append("rented", rented);
      formData.append("rentamt", rentamt);
      formData.append("offer", offer);

      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "subcategory/addnewsubcategory",
        formData,
        config
      );
      if (result) {
        swal({
          title: "Category Submitted Successfully",
          icon: "success",
          dangerMode: true,
        });
      }
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={1}>
          {/* Heading(Category Interface) */}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                padding: 20,
              }}
            >
              Sub Category Interface
            </div>
          </Grid>

          {/* Text Box (Category Id) */}
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
                onChange={(event)=>setCategoryId(event.target.value)}
                label="Category ID"
              >
                {showCategory()}
              </Select>
            </FormControl>
          </Grid>

          {/* Text Box (Sub Category Name) */}
          <Grid item xs={12}>
            <TextField
              onChange={(event) => setSubCategoryName(event.target.value)}
              label="Sub Category Name"
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Text Box (SUB Category Description) */}
          <Grid item xs={12}>
            <TextField
              onChange={(event) =>
                setSubCategoryDescription(event.target.value)
              }
              label="Sub Category Description"
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Text Box (Price) */}
          <Grid item xs={4}>
            <TextField
              onChange={(event) => setPrice(event.target.value)}
              label="Price"
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Text Box (Stock) */}
          <Grid item xs={4}>
            <TextField
              onChange={(event) => setStock(event.target.value)}
              label="Stock"
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Text Box (Rented) */}
          <Grid item xs={4}>
            <TextField
              onChange={(event) => setRented(event.target.value)}
              label="Rented"
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Text Box (Rent Amount) */}
          <Grid item xs={6}>
            <TextField
              onChange={(event) => setRentamt(event.target.value)}
              label="Rent Amount"
              variant="outlined"
              fullWidth
            />
          </Grid>

           {/* Text Box (Offer Amount) */}
           <Grid item xs={6}>
            <TextField
              onChange={(event) => setOffer(event.target.value)}
              label="Offer"
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Text(Upload Category Icon) */}
          <Grid item xs={6}>
            <span style={{ fontSize: 16, fontWeight: 400 }}>
              Upload Category Icon
            </span>
            <input
              onChange={(event) => handleIcon(event)}
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              {/* Upload Button */}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>

          {/* Image Frame */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="rounded"
              src={icon.file}
              style={{ width: 60, height: 60 }}
            />
          </Grid>

          {/* Text(Upload Category Ad) */}
          <Grid item xs={6}>
            <span style={{ fontSize: 16, fontWeight: 400 }}>
              Upload Category Ad
            </span>
            <input
              onChange={(event) => handleAd(event)}
              accept="image/*"
              className={classes.input}
              id="icon-button-ad"
              type="file"
            />
            <label htmlFor="icon-button-ad">
              {/* Upload Button */}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>

          {/* Image Frame */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="rounded"
              src={ad.file}
              style={{ width: 60, height: 60 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Ad Status
              </InputLabel>

              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={age}
                onChange={(event) => setAdStatus(event.target.value)}
                label="Ad Status"
              >
                <MenuItem value={"Activate"}>Activate</MenuItem>
                <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Save Button */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleClick()}
              fullWidth
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>

          {/* Reset Button */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button fullWidth variant="contained" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
