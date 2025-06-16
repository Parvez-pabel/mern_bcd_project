import React from "react";
import CartStore from "../../store/CartStore";

const CartButton = (props) => {
  let { isCartSubmit } = CartStore();

  if (!isCartSubmit) {
    return (
      <button onClick={props.onClick} type="submit" className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className} type="submit">
        Processing...
        <div className="spinner-border spinner-border-sm " role="status"></div>
      </button>
    );
  }
};

export default CartButton;
