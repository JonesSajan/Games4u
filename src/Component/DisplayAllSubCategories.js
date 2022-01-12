import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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
import {
  ServerURL,
  postData,
  postDataAndImage,
  getData,
} from "./FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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

    borderRadius: 15,
    borderStyle: "solid",
  },

  input: {
    display: "none",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 700,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayAllSubCategory(props) {
  const [list, setList] = useState();
  const classes = useStyles();
  //////////////////////Edit Form///////////////////////////////////////////////////
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [icon, setIcon] = useState({ bytes: "", file: "/noimage.JFIF" });
  const [ad, setAd] = useState({ bytes: "", file: "/noimage.JFIF" });
  const [adStatus, setAdStatus] = useState("");
  const [stock, setStock] = useState("");
  const [rented, setRented] = useState("");
  const [rentamt, setRentamt] = useState("");
  const [offer, setOffer] = useState("");
  const [iconSaveCancel, setIconSaveCancel] = useState(false);
  const [adSaveCancel, setAdSaveCancel] = useState(false);
  const [getRowData, setRowData] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const handleAd = (event) => {
    setAd({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
    setAdSaveCancel(true);
  };

  const handleIcon = (event) => {
    setIcon({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
    setIconSaveCancel(true);
  };

  const handleDelete = async () => {
    var body = { subcategoryid: subCategoryId };
    var result = await postData("subcategory/deletesubcategory", body);
    if (result) {
      swal({
        title: "Sub-Category Deleted Successfully ",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Fail To Delete Record ",
        icon: "success",
        dangerMode: true,
      });
    }
  };

  const handleClick = async () => {
    var error = false;
    var msg = "<div>";
    if (isBlank(categoryId)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category ID Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(subCategoryName)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Category Name Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(subCategoryDescription)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Sub Category Description Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(Price)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Price Should Not Be Blank..</b></font><br>";
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
        "<font color='#e74c3c'><b>Stock Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(rented)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Rented Should Not Be Blank..</b></font><br>";
    }
    if (isBlank(rentamt)) {
      error = true;
      msg +=
        "<font color='#e74c3c'><b>Rent Amount Should Not Be Blank..</b></font><br>";
    }

    if (error) {
      swalhtml(renderHTML(msg));
    } else {
      var body = {
        subcategoryid: subCategoryId,
        categoryid: categoryId,
        subcategoryname: subCategoryName,
        description: subCategoryDescription,
        price: Price,
        adstatus: adStatus,
        stock: stock,
        rented: rented,
        rentamt: rentamt,
        offer: offer,
      };
      var result = await postData("subcategory/editsubcategorydata", body);

      if (result) {
        swal({
          title: "Sub Category Submitted Successfully",
          icon: "success",
          dangerMode: true,
        });
      }
    }
  };
  const handleCancelIcon = () => {
    setIconSaveCancel(true);
    setIcon({ bytes: "", file: `${ServerURL}/images/${getRowData.picture}` });
  };

  const handleCancelAd = () => {
    setAdSaveCancel(false);
    setAd({ bytes: "", file: `${ServerURL}/images/${getRowData.ad}` });
  };

  const handleClickSaveIcon = async () => {
    var formData = new FormData();
    formData.append("subcategoryid", subCategoryId);
    formData.append("picture", icon.bytes);

    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "subcategory/editicon",
      formData,
      config
    );
    if (result) {
      swal({
        title: "Icon Updated Successfully",
        icon: "success",
        dangerMode: true,
      });
      setIconSaveCancel(false);
    }
  };

  const handleClickSaveAd = async () => {
    var formData = new FormData();
    formData.append("subcategoryid", subCategoryId);
    formData.append("ad", ad.bytes);

    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage("subcategory/editad", formData, config);
    if (result) {
      swal({
        title: "Ad Updated Successfully",
        icon: "success",
        dangerMode: true,
      });
      setAdSaveCancel(false);
    }
  };

  const editFormView = () => {
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

            {/* Text Box (Category ID) */}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-category`">
                  Category ID
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-category"
                  id="demo-simple-select-outlined-category"
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  label="Category ID"
                >
                  {showCategory()}
                </Select>
              </FormControl>
            </Grid>

            {/* Text Box (Category Name) */}
            <Grid item xs={12}>
              <TextField
                value={subCategoryName}
                onChange={(event) => setSubCategoryName(event.target.value)}
                label="Sub Category Name"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Text Box (SubCategory Description) */}
            <Grid item xs={12}>
              <TextField
                value={subCategoryDescription}
                onChange={(event) =>
                  setSubCategoryDescription(event.target.value)
                }
                label="Category Description"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Text Box (Price */}
            <Grid item xs={4}>
              <TextField
                value={Price}
                onChange={(event) => setPrice(event.target.value)}
                label="Price"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Text Box (Stock) */}
            <Grid item xs={4}>
              <TextField
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                label="Stock"
                variant="outlined"
                fullWidth
              />
            </Grid>
            {/* Text Box (Rented) */}
            <Grid item xs={4}>
              <TextField
                value={rented}
                onChange={(event) => setRented(event.target.value)}
                label="Rented"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={rentamt}
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
                value={offer}
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
              {iconSaveCancel ? (
                <span>
                  <Button
                    onClick={() => handleClickSaveIcon()}
                    color="secondary"
                  >
                    save
                  </Button>
                  <Button color="primary" onClick={() => handleCancelIcon()}>
                    Cancel
                  </Button>
                </span>
              ) : (
                <></>
              )}
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
              {adSaveCancel ? (
                <span>
                  <Button onClick={() => handleClickSaveAd()} color="secondary">
                    save
                  </Button>
                  <Button color="primary" onClick={() => handleCancelAd()}>
                    Cancel
                  </Button>
                </span>
              ) : (
                <></>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Ad Status
                </InputLabel>

                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={adStatus}
                  onChange={(event) => setAdStatus(event.target.value)}
                  label="Ad Status"
                >
                  <MenuItem value={"Activate"}>Activate</MenuItem>
                  <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////Edit Dialoge////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (rowData) => {
    setRowData(rowData);
    setOpen(true);
    setSubCategoryId(rowData.subcategoryid);
    setCategoryId(rowData.categoryid);
    setSubCategoryName(rowData.subcategoryname);
    setSubCategoryDescription(rowData.description);
    setPrice(rowData.price);
    setStock(rowData.stock);
    setRented(rowData.rented);
    setRentamt(rowData.rentamt);
    setIcon({ bytes: "", file: `${ServerURL}/images/${rowData.icon}` });
    setAd({ bytes: "", file: `${ServerURL}/images/${rowData.ad}` });
    setOffer(rowData.offer);
    setAdStatus(rowData.adstatus);
  };

  const handleClose = () => {
    setOpen(false);
    fetchAllSubCategory();
  };

  const showEditDialog = () => {
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete Game Categories
              </Typography>
              <Button autoFocus color="inherit" onClick={() => handleClick()}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={() => handleDelete()}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );
  };

  //////////////////////////////////////////////////////////////////////////////////

  const fetchAllSubCategory = async () => {
    var result = await getData("subcategory/displayall");
    setList(result);
  };
  const fetchAllCategory = async () => {
    var result = await getData("categories/dispalyallcategory");
    setListCategory(result);
  };

  const showCategory = () => {
    return listCategory.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  useEffect(function () {
    fetchAllSubCategory();
    fetchAllCategory();
  }, []);

  function displayAll() {
    return (
      <div>
        <MaterialTable
          title="Sub Category List"
          columns={[
            { title: "Id", field: "categoryid" },
            { title: "Name", field: "subcategoryname" },
            { title: "Description", field: "description" },
            { title: "Price", field: "price" },
            { title: "Stock", field: "stock" },
            { title: "Rented", field: "rented" },
            { title: "Rent Amount", field: "rentamt" },
            {
              title: "Ad",
              field: "ad",
              render: (rowData) => (
                <div>
                  <img alt={""}
                    src={`${ServerURL}/images/${rowData.ad}`}
                    style={{ borderRadius: "5" }}
                    width="40"
                    height="40"
                  />
                </div>
              ),
            },
            {
              title: "Icon",
              field: "icon",
              render: (rowData) => (
                <div>
                  <img alt={""}
                    src={`${ServerURL}/images/${rowData.picture}`}
                    style={{ borderRadius: "5" }}
                    width="40"
                    height="40"
                  />
                </div>
              ),
            },
            { title: "Status", field: "adstatus" },
          ]}
          data={list}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Sub Category",
              onClick: (event, rowData) => handleClickOpen(rowData),
            },
          ]}
        />
        {showEditDialog()}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItem: "center",
      }}
    >
      <div style={{ width: 900, marginTop: 40, padding: 3 }}>
        {displayAll()}
      </div>
    </div>
  );
}
