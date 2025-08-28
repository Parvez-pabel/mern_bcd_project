import React, { useEffect } from "react";
import ProfileSkeleton from "../../skeleton/ProfileSkeleton";
import UserStore from "../../store/UserStore";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from './SubmitButton';


const Profile = () => {
  let {
    ProfileForm,
    ProfileFormChange,
    ProfileDetails,
    ProfileDetailsRequest,
    ProfileSaveRequest,
  } = UserStore();
  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
    })();
  }, []);
    const navigate = useNavigate();
  const LogoutRequest = UserStore((state) => state.LogoutRequest);
    const onLogout = async () => {
    await LogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    toast.success("Logout Successful!"), navigate("/");
  };
  const save = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the profile?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      let res = await ProfileSaveRequest(ProfileForm);
      if (res) {
        toast.success("Profile Updated successfully");
        await ProfileDetailsRequest();
      }
    }
  };

  if (ProfileDetails === null) {
    return <ProfileSkeleton />;
  } else {
    return (
      <div className="container mt-5 d-flex flex-column gap-4 ">
        <div className="card p-5 rounded-3 d-flex flex-row gap-4 justify-content-end">
          <>
            <Link type="button" className="btn btn-primary" to={`/orders`}>
              Payment & Orders History
            </Link>
            <Link type="button" className="btn btn-secondary">
              Purchase Products
            </Link>
            <button type="button" className="btn btn-success">
              Forget Password
            </button>
            <button type="button" className="btn btn-warning">
              Warning
            </button>
            <button type="button" className="btn btn-info">
              Info
            </button>
            <SubmitButton
              onClick={onLogout}
              className="btn ms-3 btn-danger d-flex"
              text="Logout"
            ></SubmitButton>
          </>
        </div>
        <div className="card p-5 rounded-3">
          <h6>Customer Details</h6>
          <hr />
          <div className="row mb-4">
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Name </label>
              <input
                value={ProfileForm.cus_name}
                onChange={(e) => {
                  ProfileFormChange("cus_name", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Phone </label>
              <input
                value={ProfileForm.cus_phone}
                onChange={(e) => {
                  ProfileFormChange("cus_phone", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Fax </label>
              <input
                value={ProfileForm.cus_fax}
                onChange={(e) => {
                  ProfileFormChange("cus_fax", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Country </label>
              <input
                value={ProfileForm.cus_country}
                onChange={(e) => {
                  ProfileFormChange("cus_country", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer City </label>
              <input
                value={ProfileForm.cus_city}
                onChange={(e) => {
                  ProfileFormChange("cus_city", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer State </label>
              <input
                value={ProfileForm.cus_state}
                onChange={(e) => {
                  ProfileFormChange("cus_state", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Post Code </label>
              <input
                value={ProfileForm.cus_postCode}
                onChange={(e) => {
                  ProfileFormChange("cus_postCode", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Address</label>
              <input
                value={ProfileForm.cus_add}
                onChange={(e) => {
                  ProfileFormChange("cus_add", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
          </div>
          <h6>Shipping Details</h6>
          <hr />
          <div className="row">
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Name </label>
              <input
                value={ProfileForm.ship_name}
                onChange={(e) => {
                  ProfileFormChange("ship_name", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Phone </label>
              <input
                value={ProfileForm.ship_phone}
                onChange={(e) => {
                  ProfileFormChange("ship_phone", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Country </label>
              <input
                value={ProfileForm.ship_country}
                onChange={(e) => {
                  ProfileFormChange("ship_country", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping City </label>
              <input
                value={ProfileForm.ship_city}
                onChange={(e) => {
                  ProfileFormChange("ship_city", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping State </label>
              <input
                value={ProfileForm.ship_state}
                onChange={(e) => {
                  ProfileFormChange("ship_state", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Post Code </label>
              <input
                value={ProfileForm.ship_postCode}
                onChange={(e) => {
                  ProfileFormChange("ship_postCode", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Address</label>
              <input
                value={ProfileForm.ship_add}
                onChange={(e) => {
                  ProfileFormChange("ship_add", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 p-2">
              <button onClick={save} className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
