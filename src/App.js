import CategoryInterface from "./Component/CategoryInterface";
import DisplayAllCategory from "./Component/DisplayAllCategories";
import AdminLogin from "./Component/AdminLogin";
import AdminDashBoard from "./Component/AdminDashBoard"
import SubCategoryInterface from "./Component/SubCategoryInterface"
import DisplayAllSubCategories from "./Component/DisplayAllSubCategories"
import GameInterface from "./Component/GameInterface"
import DisplayGames from "./Component/DisplayGames"
import AccessoriesInterface from "./Component/AccessoriesInterface"
import DisplayAccessories from "./Component/DisplayAccessories"
import { BrowserRouter as Router, Route } from "react-router-dom";
import   Header from "./Component/ClientView/Header"
import ConsoleList from "./Component/ClientView/ConsoleList"
import QtySpinner from "./Component/ClientView/QtySpinner"
import    Home  from "../src/Component/ClientView/Home"
import   ProductView from "./Component/ClientView/ProductView"
import   Termsandcondition from "./Component/Termsandcondition"
import   Displayterms from "./Component/Displayterms"
import   Document from "./Component/Documents"
import   Displaydocuments from "./Component/Displaydocuments"
import   PaymentGateWay from "./Component/ClientView/PaymentGateWay"
import   GamesPicture from "./Component/GamesPicture"
import   ConsolePicture from "./Component/ConsolePicture"
import   ShowCart from "./Component/ClientView/ShowCart"
import   SignUpForm from "./Component/ClientView/SignUpForm"
import   MobileRegistration from "./Component/ClientView/MobileRegistration"
import MyAccount from "./Component/ClientView/MyAccount";
function App(props) {
  return (
    <div>
      <Router>
        <Route
    strict
    exact
    component={CategoryInterface}
    path="/categoryinterface"
    history={props.history}
    />

        <Route
          strict
          exact
          component={DisplayAllCategory}
          path="/displayallcategory"
          history={props.history}
        />

        <Route
          strict
          exact
          component={AdminLogin}
          path="/adminlogin"
          history={props.history}
        />

     <Route
          strict
          exact
          component={AdminDashBoard}
          path="/admindashboard"
          history={props.history}
        />


<Route
          strict
          exact
          component={SubCategoryInterface}
          path="/subcategoryinterface"
          history={props.history}
        />

    <Route
          strict
          exact
          component={DisplayAllSubCategories}
          path="/displayallsubcategories"
          history={props.history}
        />

     <Route
          strict
          exact
          component={AccessoriesInterface}
          path="/accesoriesinterface"
          history={props.history}
        />

    <Route
          strict
          exact
          component={DisplayAccessories}
          path="/displayaccessories"
          history={props.history}
        />

   <Route
          strict
          exact
          component={GameInterface}
          path="/gameinterface"
          history={props.history}
        />

    <Route
          strict
          exact
          component={DisplayGames}
          path="/displaygames"
          history={props.history}
        />

      <Route
          strict
          exact
          component={Header}
          path="/header"
          history={props.history}
        />

     <Route
          strict
          exact
          component={Home}
          path="/home"
          history={props.history}
        />

     <Route
          strict
          exact
          component={ConsoleList}
          path="/consolelist"
          history={props.history}
        />

    <Route
          strict
          exact
          component={QtySpinner}
          path="/qtyspinner"
          history={props.history}
        />

      <Route
          strict
          exact
          component={ProductView}
          path="/productview"
          history={props.history}
        />

<Route
          strict
          exact
          component={Displaydocuments}
          path="/displaydocuments"
          history={props.history}
        />
<Route
          strict
          exact
          component={Document}
          path="/documents"
          history={props.history}
        />
<Route
          strict
          exact
          component={Displayterms}
          path="/displayterms"
          history={props.history}
        />
     <Route
          strict
          exact
          component={Termsandcondition}
          path="/termsandcondition"
          history={props.history}
        />


<Route
          strict
          exact
          component={ConsolePicture}
          path="/consolepicture"
          history={props.history}
        />

<Route
          strict
          exact
          component={GamesPicture}
          path="/gamespicture"
          history={props.history}
        />

<Route
          strict
          exact
          component={AccessoriesInterface}
          path="/accessoriesinterface"
          history={props.history}
        />

<Route
          strict
          exact
          component={MobileRegistration}
          path="/mobileregistration"
          history={props.history}
        />

          <Route
              strict
              exact
              component={MyAccount}
              path="/myaccount"
              history={props.history}
          />

<Route
          strict
          exact
          component={SignUpForm}
          path="/signupform"
          history={props.history}
        />

<Route
          strict
          exact
          component={ShowCart}
          path="/showcart"
          history={props.history}
        />

     <Route
          strict
          exact
          component={PaymentGateWay}
          path="/paymentgateway"
          history={props.history}
        />

      </Router>
    </div>
  );
}

export default App;
