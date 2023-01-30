import { cartActions } from "./cart-slice";
import { uiAction } from "./ui-slice";
export const sendCartDataAction = (cartData) => {
  return async (dispatch) => {
    const sendCartData = async () => {
      dispatch(
        uiAction.notifs({
          status: "pending",
          title: "REQUESTING",
          message: "Sending Cart Data",
        })
      );
      console.log(cartData);
      const response = await fetch(
        "https://react-http-6be32-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      dispatch(
        uiAction.notifs({
          status: "success",
          title: "SUCCESS",
          message: "Successfully Send Cart Data",
        })
      );
      console.log("send cart data successfully");
    };
    try {
      await sendCartData();
    } catch (e) {
      dispatch(
        uiAction.notifs({
          status: "error",
          title: "Failure",
          message: "Unable to Send Cart Data",
        })
      );
    }
  };
};
export const fetchCartDataAction = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      dispatch(
        uiAction.notifs({
          status: "pending",
          title: "REQUESTING",
          message: "fetching Cart Data",
        })
      );
      const response = await fetch(
        "https://react-http-6be32-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();

      dispatch(
        uiAction.notifs({
          status: "success",
          title: "SUCCESS",
          message: "Successfully fetch Cart Data",
        })
      );
      dispatch(cartActions.replaceCart(data));

      console.log("Cart data fetch successfully");
    };
    try {
      await fetchCartData();
    } catch (e) {
      dispatch(
        uiAction.notifs({
          status: "error",
          title: "Failure",
          message: "Unable to fetch Cart data",
        })
      );
    }
  };
};
