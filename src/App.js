import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/Layout/Notification";
import { fetchCartDataAction, sendCartDataAction } from "./store/cartActions";
let firstTime = true;
function App() {
  const dispatch = useDispatch();
  const { showCart, notification } = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (firstTime) {
      firstTime = false;
      return;
    }
    if (!cart.isChanged) {
      return;
    }
    dispatch(sendCartDataAction(cart));
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartDataAction());
  }, [dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
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
