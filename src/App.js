import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import { cartActions } from "./store/cart-slice";
import Notification from "./components/Layout/Notification";
let firstTime = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    console.log("first time running");
    const fetchCartData = async () => {
      dispatch(uiActions.req());
      const response = await fetch(
        "https://react-http-6be32-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something Went wrong");
      }
      const data = await response.json();
      console.log("cart loaded  successfully");
      if (!data.items) {
        data.items = [];
      }
      dispatch(cartActions.replaceCart(data));
      dispatch(uiActions.success());
    };
    fetchCartData().catch((e) => {
      dispatch(uiActions.error());
    });
  }, [dispatch]);
  useEffect(() => {
    const sendData = async () => {
      dispatch(uiActions.req());
      const response = await fetch(
        "https://react-http-6be32-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something Went wrong");
      }
      dispatch(uiActions.success());

      console.log("request send successfully");
    };
    if (firstTime) {
      firstTime = false;
      return;
    }
    sendData().catch((e) => {
      dispatch(uiActions.error());
      console.log(e.message);
    });
    setTimeout(() => {
      dispatch(uiActions.reset());
    }, 3000);

    console.log("side effect");
  }, [cart, dispatch]);
  return (
    <React.Fragment>
      {Object.keys(notification).length !== 0 && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
