import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import HomeHeader from "../Header(HOME)/header";
import HomeFooter from "../Footer(HOME)/Footer";
// import { setToken, getToken } from "../Authentication/Auth";
function Register() {
  const [UserData, setUserData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    State: "",
    Distric: "",
    Address: "",
    Pincode: "",
  });
  const SignInPageNevigate = useNavigate();
  const routes = [{ key: "Sign In", route: "/" }];
  const [checkBoxStatus, setCheckBoxStatus] = useState();
  const [error, setError] = useState("");
  const [passErr, setPassErr] = useState("");
  let url =
    process.env.REACT_APP_API_URL || "http://localhost:9000/user/register";
  // console.log(UserData);
  async function Submit(e) {
    e.preventDefault();
    if (
      UserData.Phone.length === 10 &&
      16 >= UserData.Password.length &&
      UserData.Password.length >= 6
    ) {
      await fetch(`${url}/user/register`, {
        method: "post",
        body: JSON.stringify(UserData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.Message === "Registration Successfull") {
            toast.success("Registration Successfull");
            setTimeout(() => {
              SignInPageNevigate("/");
            }, 1500);
          } else {
            toast.error(data.Message);
          }
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } else {
      if (UserData.Phone.length !== 10) {
        setError("Phone Number Must Have 10 Digits");
      } else if (
        16 < UserData.Password.length ||
        UserData.Password.length < 6
      ) {
        setError("Password Must have Min-6 And Max-16 Characetrs");
      }
    }
  }
  return (
    <>
      <div className="Registation_wrapper">
        {" "}
        <ToastContainer
          autoClose={1500}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
        />
        <HomeHeader></HomeHeader>
        <div className="Registation_section_Container">
          <section className="Registation_LeftSide_Container">
            <h1>Laundry Service</h1>
            <p id="Registation_DoorStep_para">
              Doorstep Wash & Dryclean Service
            </p>
            <p id="Registation_AlreadyHaveAccount_para">Already Have Account</p>
            <Link to={routes[0].route}>
              <button>Sign In</button>
            </Link>
          </section>
          <section className="Registartion_form_container">
            <h1>Register</h1>
            <form onSubmit={Submit}>
              <div className="Registation_Detail_Container">
                <div className="Registation_Detail_Container_left">
                  <label htmlFor="Registation_Name">Name</label>
                  <input
                    id="Registation_Name"
                    className="Registation_UserDetail"
                    // placeholder="Name"
                    type="text"
                    name="Name"
                    onChange={(e) => {
                      setError("");
                      setUserData({ ...UserData, Name: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="Registation_Phone">Phone</label>
                  <input
                    id="Registation_Phone"
                    className="Registation_UserDetail"
                    // placeholder="Phone"
                    type="text"
                    name="Phone"
                    onChange={(e) => {
                      setError("");
                      setUserData({ ...UserData, Phone: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="Registation_District">District</label>
                  <input
                    id="Registation_District"
                    type="text"
                    className="Registation_UserDetail"
                    // placeholder="District"
                    name="District"
                    onChange={(e) => {
                      setError("");
                      setUserData({ ...UserData, District: e.target.value });
                    }}
                    required
                  />{" "}
                  <label htmlFor="Registation_Pincode">Pincode</label>
                  <input
                    id="Registation_Pincode"
                    type="text"
                    className="Registation_UserDetail"
                    // placeholder="Pincode"
                    name="Pincode"
                    onChange={(e) => {
                      setError("");
                      setUserData({ ...UserData, Pincode: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="Registation_Detail_Container_right">
                  <label htmlFor="Registation_Email">Email</label>
                  <input
                    id="Registation_Email"
                    type="text"
                    className="Registation_UserDetail"
                    // placeholder="Email"
                    name="Email"
                    onChange={(e) => {
                      setError("");
                      setUserData({
                        ...UserData,
                        Email: e.target.value.toLowerCase(),
                      });
                    }}
                    required
                  />
                  <label htmlFor="Registation_State">State</label>
                  <input
                    id="Registation_State"
                    type="text"
                    className="Registation_UserDetail"
                    // placeholder="State"
                    name="State"
                    onChange={(e) => {
                      setError("");
                      setUserData({ ...UserData, State: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="Registation_Address">Address</label>
                  <input
                    id="Registation_Address"
                    type="text"
                    className="Registation_UserDetail"
                    // placeholder="Address"
                    name="Address"
                    onChange={(e) => {
                      setError("");
                      setUserData({ ...UserData, Address: e.target.value });
                    }}
                    required
                  />
                  <label htmlFor="Registation_password">Set Password</label>
                  <input
                    type={"text"}
                    id="Registation_password"
                    className="Registation_UserDetail"
                    // placeholder="Set Password"
                    name="Password"
                    onChange={(e) => {
                      if (e.target.value.length > 6) {
                        setPassErr("");
                      }
                      setError("");
                      setUserData({ ...UserData, Password: e.target.value });
                    }}
                    onBlur={(e) => {
                      if (e.target.value.length <= 6) {
                        setPassErr(
                          "Password must have Min-6 Max-16 characters"
                        );
                      } else {
                        setPassErr("");
                      }
                    }}
                    required
                  />
                </div>
                <div className="Accept_T_C_container">
                  <input
                    className="T_C_checkbox"
                    type="checkbox"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      if (e.target.value === "on") {
                        setCheckBoxStatus(true);
                      } else {
                        setCheckBoxStatus(false);
                      }
                    }}
                  />
                  {/* <Link> */}
                  <p className="Accept_T_C_para">
                    I agree to Terms & Condition receiving marketing and
                    promotional materials
                  </p>
                  {/* </Link> */}
                </div>
              </div>
              <p id="Registation_Form_validation_ErrMsg">
                {error ? error : ""}
              </p>
              <button
                id="Registation_Register_btn"
                type="submit"
                disabled={checkBoxStatus ? false : true}
              >
                Register
              </button>
            </form>
          </section>
        </div>
        <HomeFooter></HomeFooter>
      </div>
    </>
  );
}
export default Register;
