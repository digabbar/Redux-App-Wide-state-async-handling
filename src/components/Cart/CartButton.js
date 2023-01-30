import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice";
const CartButton = (props) => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiAction.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
