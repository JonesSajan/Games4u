import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  postDataAndImage,
  getData,
  postData,
} from "./FetchNodeServices";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    padding: 20,
    width: 700,
    marginTop: 20,
    background: "#FFF",
  },
  input: {
    display: "none",
  },
}));

export default function ConsolePicture(props) {
  const classes = useStyles();
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [dataSources, setDataSource] = useState([]);

  const [listCategory, setListCategory] = useState([]);
  const [listSubCategory, setListSubCategory] = useState([]);
  ///////////////////////multiple file uploader///////////
  const handleClick = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryid", subcategoryId);
    // eslint-disable-next-line
    dataSources.map((item, index) => {
      formData.append("pictures" + index, item);
    });

    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "subcategorypicture/addconsolepic",
      formData,
      config
    );
    if (result) {
      swal({
        title: "Console Picture Submitted Successfully",
        icon: "success",
        dangerMode: true,
      });
    }
  };

  const handleSave = async (files) => {
    setDataSource(files);
    console.log(files)   
};

  /////////////////////////////////////////////////////////

  const handleCategoryChange = async (event) => {
    setCategoryId(event.target.value);
    var body = { categoryid: event.target.value };
    var result = await postData(
      "subcategory/displaysubcategorybycategoryid",
      body
    );
    setListSubCategory(result);
  };

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
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={1}>
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
              Console Picture
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-category">
                Category Id
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-category"
                id="demo-simple-select-outlined-category"
                //value={age}
                onChange={(event) => handleCategoryChange(event)}
                label="Category Id"
              >
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-subcategory">
                SubCategory Id
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-subcategory"
                id="demo-simple-select-outlined-subcategory"
                //value={age}
                onChange={(event) => setSubCategoryId(event.target.value)}
                label="SubCategory Id"
              >
                {fillSubCategory()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <DropzoneArea
              onChange={(files) => handleSave(files)}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              //  showPreviews={true}
              maxFileSize={5000000}
              filesLimit={10}
              //onClose={()=>handleClose()}
            />
          </Grid>

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
