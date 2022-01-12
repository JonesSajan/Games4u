import {postData} from "./FetchNodeServices";

const initialState={
    cart: {},
    user:{}
}

export default function RootReducer(state=initialState,action)
{
    const addToUserCart =async () => {
        let body = {
            cart: localStorage.getItem("cart"),
            mobileno: Object.keys(JSON.parse(localStorage.getItem("userData")))
        }

        let result = await postData("userdetail/addCart", body);

        if (!result.result) {
            alert("Error");
        }
      
    }

   switch(action.type) {
       case 'ADD_CART':
           state.cart[action.payload[0]]=action.payload[1]
           localStorage.setItem("cart", JSON.stringify(state.cart));
           if (Object.keys(state.user).length)
               addToUserCart().then(r => 0);
           return {cart:state.cart,user:state.user}
       case 'REMOVE_CART':
           delete state.cart[action.payload[0]]
           localStorage.setItem("cart", JSON.stringify(state.cart));
           if (Object.keys(state.user).length)
               addToUserCart().then(r => 0);
           return {cart:state.cart,user:state.user}
       case 'ADD_USER':
           state.user[action.payload[0]]=action.payload[1]
           localStorage.setItem("userData", JSON.stringify(state.user));
           return {cart:state.cart,user:state.user}
       case 'SET_ALL_ITEM':
           state.cart=action.payload
           return {cart:state.cart,user:state.user}
       case 'SET_USER':
           state.user=action.payload
           return {cart:state.cart,user:state.user}
       case 'REMOVE_USER':

           state.user={}
           state.cart={}

           localStorage.removeItem("userData");
           localStorage.removeItem("cart");
           localStorage.setItem("rent", "true");

           return {cart:state.cart,user:state.user}
       default:
           return {cart:state.cart,user:state.user}
     }
}