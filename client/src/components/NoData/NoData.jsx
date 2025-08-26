import notfound from "../../assets/images/notfound.png";

const NoData = () => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5">
        <div className=" col-lg-12  col-md-4 text-center ">
          <h4>Please Add Something into the Cart</h4>
          <img src={notfound} alt="" className=" img-fluid h-25 mt-5"  />
        </div>
      </div>
    </div>
  );
};

export default NoData;
