import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CategoryInterface from "./CategoryInterface";
import DisplayAllCategories from "./DisplayAllCategories";
import SubCategoryInterface from "./SubCategoryInterface";
import DisplayAllSubCategory from "./DisplayAllSubCategories";
import AccessoriesInterface from "./AccessoriesInterface";
import DisplayAccessories from "./DisplayAccessories";
import GameInterface from "./GameInterface";
import DisplayGames from "./DisplayGames"
import Documents from "./Documents"
import Termsandcondition from "./Termsandcondition"
import GamesPicture from "./GamesPicture";
import AccessoriesPicture from "./AccessoriesPicture";
import ConsolePicture from "./ConsolePicture";



export default function ListItems(props) {
  const handleClick = (v) => {
    props.setComponent(v);
  };

  return (
    <div>
      <div>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Categories"
            onClick={() => handleClick(<CategoryInterface />)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText
            primary="List Categories"
            onClick={() => handleClick(<DisplayAllCategories />)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sub Categories"
            onClick={() => handleClick(<SubCategoryInterface />)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            primary="List Subcategories"
            onClick={() => handleClick(<DisplayAllSubCategory />)}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Accessories"
            onClick={() => handleClick(<AccessoriesInterface />)}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="List Accessories"
            onClick={() => handleClick(<DisplayAccessories />)}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Add Games"
            onClick={() => handleClick(<GameInterface />)}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="List Games"
            onClick={() => handleClick(<DisplayGames />)}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Games Pictures"
            onClick={() => handleClick(<GamesPicture />)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Accessories Pictures"
            onClick={() => handleClick(<AccessoriesPicture />)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Console Pictures"
            onClick={() => handleClick(<ConsolePicture />)}
          />
        </ListItem>


      </div>

      <div>
        <ListSubheader inset>Others</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Documents" onClick={() => handleClick(<Documents />)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Terms & Condition" onClick={() => handleClick(<Termsandcondition />)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItem>



      </div>
    </div>
  );
}
