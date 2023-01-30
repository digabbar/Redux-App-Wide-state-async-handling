import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        price: props.price,
        title: props.title,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.title}</h3>
          <div className={classes.price}>${props.price.toFixed(2)}</div>
        </header>
        <p>{props.description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
