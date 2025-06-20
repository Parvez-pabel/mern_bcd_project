import CartStore from "../../store/CartStore";

const WishButton = (props) => {
  let { isWishSubmit } = CartStore();

  if (!isWishSubmit) {
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

export default WishButton;
