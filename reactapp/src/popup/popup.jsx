import React, { useState } from "react";
import { useEffect } from "react";
import "./popup.css";
import tickimage from "./tick-image.png";

const Popup = (props) => {
  const [modal1, setModal1] = useState(false);

  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  useEffect(() => {
    toggleModal1();
  }, []);

  if (modal1) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {modal1 && (  
        <div className="modal">
          <div onClick={toggleModal1} className="overlay"></div>
          <div className="modal-content">
            <img src={tickimage} alt="tick" className="tickimage1" />
            <h3 className="modal_title">Order placed Successfully.</h3>
            <div><p className="modal_para">
              you can track the delivery in the "Orders" section.
            </p></div>
            <a href="/orders">
              {" "}
              <button className="close-modal" onClick={toggleModal1}>
                Go to Orders
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
