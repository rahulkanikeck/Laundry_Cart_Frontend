
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../authOperations";
import Alert from "../alert/alert";
import "./pastOrders.css";

const URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

const PastOrders = ({ data }) => {
  const navigate = useNavigate();

  const [alertPopUp, setAlertPopUp] = useState(false);
  const [summaryOn, setSummaryOn] = useState(false);
  const [cancelDisplay, setCancelDisplay] = useState(true);

  data?.map((obj) => {
    const date = new Date(obj.createdAt);
    return (obj.createdAt = date.toLocaleString());
  });

  const handleCancel = (order_id) => {
    const token = getToken("token");
    setCancelDisplay(!cancelDisplay);

    fetch(`${URL}/api/v1/orders/${order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status: "Cancelled" }),
    }).then((response) => {
      if (response.status === 403 || response.status === 401)
        return navigate("/");
      setAlertPopUp(true);
    });
  };

  const handleView = (order_Id) => {
    setSummaryOn(!summaryOn);
  };

  return (
    <>
      {alertPopUp ? <Alert /> : <></>}

      <table id="order-table" className="fontSize">
        <thead>
          <tr style={{ position: "sticky", top: 0 }}>
            <th className="cell">Order Id</th>
            <th className="cell">Order Date and Time</th>
            <th className="cell">Store Location</th>
            <th className="cell">City</th>
            <th className="cell">Store Phone</th>
            <th className="cell">Total Items</th>
            <th className="cell">Price</th>
            <th className="cell">Status</th>
            <th className="cell"> </th>
            <th className="cell">View</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj) => (
            <tr key={obj.orderId}>
              <td>{obj.orderId}</td>
              <td>{obj.createdAt}</td>
              <td>{obj.storeLocation}</td>
              <td>{obj.city}</td>
              <td>{obj.storePhone}</td>
              <td>{obj.totalItems}</td>
              <td style={{ color: "#5861AE", fontWeight: "bold" }}>
                {obj.price}
              </td>
              <td
                style={
                  obj.status === "cancelled"
                    ? { color: "red", fontWeight: "bold" }
                    : {}
                }
              >
                {obj.status}
              </td>
              <td>
                {" "}
                {obj.status === "cancelled" ? (
                  ""
                ) : (
                  <p className="para" onClick={() => handleCancel(obj.orderId)}>
                    Cancel Order
                  </p>
                )}
              </td>
              {/* <td>{cancelDisplay && <p className="para" onClick={() => handleCancel(obj.orderId)}>Cancel Order</p>} </td> */}
              <td>
                <img
                  src="/icons/view.png"
                  alt="view"
                  width="15vw"
                  onClick={() => {
                    handleView(obj.orderId);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PastOrders;
