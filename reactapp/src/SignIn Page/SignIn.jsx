import React from "react";
import { useState } from "react";
import "./SignIn.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../Header(HOME)/header";
import HomeFooter from "../Footer(HOME)/Footer";
// import { useEffect } from "react";
import { setToken, getToken } from "../Authentication/Auth";
function SignIn() {
  const [UserData, setUserData] = useState({
    Email: "",
    Phone: "",
    Password: "",
  });
  const RegisterPagenavigate = useNavigate();
  const [error, setError] = useState("");
  const [loginData, setloginData] = useState("");
  const [name, setName] = useState("");
  let url = "http://localhost:8080/user/signin";

  // console.log(UserData);
  async function Submit(e) {
    e.preventDefault();
    await fetch(url, {
      method: "post",
      body: JSON.stringify(UserData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setToken("token", data.token);
        if (data.status === "Login Successfully") {
          toast.success("Login Successfully");
          setloginData(data);
          setTimeout(() => {
            RegisterPagenavigate("/createorders");
          }, 1500);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
    // console.log(getToken("token"));
    // log in data fetched through fetch api method
    if (loginData.status === "Failed") {
      setError(loginData.Message);
      // console.log(loginData);
    }
  }

  return (
    <>
      <div className="wrapper">
        <ToastContainer
          autoClose={1500}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
        />
        <HomeHeader></HomeHeader>
        <div className="Section_Container">
          <section className="LeftSide_Container">
            <h1>Laundry Service</h1>
            <p id="DoorStep_para">Doorstep Wash & Dryclean Service</p>
            <p id="DontHaveAccount_para">Don’t Have An Account?</p>
            <button
              onClick={() => {
                RegisterPagenavigate("/register");
              }}
            >
              Register
            </button>
          </section>
          <section className="form_container">
            <h1>SIGN IN</h1>
            <form onSubmit={Submit}>
              <input
                id="Email_phone"
                className="UserDetail"
                placeholder="Email/Phone"
                name={name}
                onChange={(e) => {
                  let Name = "";
                  setError("");
                  if (
                    e.target.value.includes("@") ||
                    e.target.value.includes(".com")
                  ) {
                    setName("Email");
                    Name = { Email: e.target.value.toLowerCase() };
                  } else {
                    setName("Phone");
                    Name = { Phone: e.target.value };
                  }
                  setUserData({ ...UserData, ...Name });
                  console.log(e.target.name);
                }}
                required
              />

              <input
                type={"password"}
                id="password"
                className="UserDetail"
                placeholder="Password"
                name="Password"
                onChange={(e) => {
                  setError("");
                  setUserData({ ...UserData, Password: e.target.value });
                }}
                required
              />

              <i className="fa fa-lock"></i>
              <p id="forgot_pass">Forgot Password?</p>
              <button id="SignIn_btn" type="submit">
                Sign In
              </button>
            </form>
            <p className="errorMsg">
              {error === "Invalid Email or Phone" ||
              error === "Incorrect Password"
                ? error
                : ""}
            </p>
          </section>
        </div>

        <HomeFooter></HomeFooter>
      </div>
    </>
  );
}
export default SignIn;
