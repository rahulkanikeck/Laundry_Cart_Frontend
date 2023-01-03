import React, { useState  , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../authOperations";
import Alert from "../alert/alert";
import './pastOrders.css';
import '../productsRow/summary.css'

const URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

const PastOrders = ({ data }) => {
  const navigate = useNavigate();

  const [alertPopUp, setAlertPopUp] = useState(false);
  const [summaryOn1, setSummaryOn1] = useState(false);
  const [cancelDisplay, setCancelDisplay] = useState(true);
    const [viewdata , setViewData] = useState()

  data?.map((obj) => {
    const date = new Date(obj.createdAt);
    return (obj.createdAt = date.toLocaleString());
  });

    const handleCancel = (order_id) => {
        const token = getToken("token");
        setCancelDisplay(!cancelDisplay)
        
        fetch(`${URL}/api/v1/orders/${order_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ status: "Cancelled" })
        })
        .then((response) => {
            if (response.status === 403 || response.status === 401) return navigate("/");
                setAlertPopUp(true);
                setSummaryOn1(!summaryOn1);
            });
    }


    const handleView = (order_id) => {
        
        const token = getToken("token");

        fetch(URL + `/api/v1/orders/${order_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((response) => {
                if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data1) => {
                setViewData(data1.viewdata);
                setSummaryOn1(!summaryOn1);
                //console.log(data.viewdata);
            });
        
    }


    const getService = (key) => {
        const cart1 = viewdata.cart;
        let serviceStr = "";
        for (let i = 0; i < cart1.length; i++) {
            if (cart1[i].key === key) {
                if (cart1[i].hasOwnProperty("washing-machine")) serviceStr += "Washing   ";
                if (cart1[i].hasOwnProperty("ironing")) serviceStr += "Ironing   ";
                if (cart1[i].hasOwnProperty("towel")) serviceStr += "Dry Wash   ";
                if (cart1[i].hasOwnProperty("bleach")) serviceStr += "Chemical Wash";
                return serviceStr;
            }
        }
    }

  return (
    <>
      {alertPopUp ? <Alert  /> : <></>}

            {summaryOn1 ? (
                <div id="summary">
                    <div className="heading both">
                        <div >Summary</div>
                        <img src="/icons/cancel.png" alt="cancel" className="png" onClick={()=> {setSummaryOn1(!summaryOn1)}}/>
                    </div>
                    {/* <div className='heading'>Summary</div> */}
                    <div className='subheading'>
                        <div className='inline_hd'>
                            Store Location:{viewdata.storeLocation}
                        </div>
                        <div className='inline_hd'>
                            Store Address:{viewdata.storeAddress}
                        </div>
                        <div className='inline_hd'>
                            Phone:{viewdata.storePhone}
                        </div>
                    </div>
                    <div className="details">Order Details</div>
                    <div>
                    <ol className='list_style'>
                        {viewdata.cart.map((data2) => (
                            <li key={data.key} className='bottom_border'>
                                <span className='inline_hd' style={{ width: "5vw" }}>{data2.name}</span>
                                <span className='inline_hd' style={{ width: "20vw" }}>{getService(data2.key)}</span>
                                <span className='inline_hd' style={{ width: "10vw" }}>
                                    {data2.value[0]} x {data2.value[1]} ={" "}
                                    <span style={{ color: "#5861AE", fontSize: "1.3rem" }}>
                                        {" "}
                                        {data2.value[2]}
                                    </span>
                                </span>
                            </li>
                        ))}
                        <li className='total_block' >Sub Total: &nbsp;&nbsp;{parseInt(viewdata.price) - 90}</li>
                        <li className='total_block1'>Pickup Charges: 90</li>
                        <li className='total_block' style={{ background: "#5861AE", fontWeight:"bold" , fontSize:"25px" ,color: "white", width: "35vw", textAlign: "right" }}>Total: <span >{viewdata.price}</span></li>
                        <li className='address'>Address
                            <div className='homeAddress'>
                                <div><img src="/icons/tick.svg" alt="tick-img" style={{ float: "right" }} /></div>
                                <div style={{ fontWeight: "bold" }}>Home</div>
                                <div style={{ color: "#777" }}>#223, 10th road, JP Nagar, Bangalore</div>
                            </div>
                        </li>
                        <li className='corner' style={{ border: "none" }}>
                            <button
                                style={{background:"red" , color:"white" , border:"none"}}
                                onClick={() => handleCancel(viewdata.orderId)}>Cancel Order
                            </button>
                        </li>
                    </ol>
                    </div>
                </div>
            ) : (
                <></>
            )}






            <table id="order-table" className={`fontSize ${summaryOn1 ? "blur" : ""}`} >
                <thead>
                    <tr style={{ position: "sticky", top: 0 }}>
                        <th className='cell'>Order Id</th>
                        <th className='cell'>Order Date and Time</th>
                        <th className='cell'>Store Location</th>
                        <th className='cell'>City</th>
                        <th className='cell'>Store Phone</th>
                        <th className='cell'>Total Items</th>
                        <th className='cell'>Price</th>
                        <th className='cell'>Status</th>
                        <th className='cell'> </th>
                        <th className='cell'>View</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(obj => (
                        <tr key={obj.orderId}>
                            <td>{obj.orderId}</td>
                            <td>{obj.createdAt}</td>
                            <td>{obj.storeLocation}</td>
                            <td>{obj.city}</td>
                            <td>{obj.storePhone}</td>
                            <td>{obj.totalItems}</td>
                            <td style={{ color: "#5861AE", fontWeight: "bold" }}>{obj.price}</td>
                            <td style={obj.status === "cancelled" ? { color: "red", fontWeight: "bold" } : {}}>{obj.status}</td>
                            <td> { obj.status=== 'cancelled' ? "" : <p className="para" onClick={() => handleCancel(obj.orderId)}>Cancel Order</p> }</td>
                            {/* <td>{cancelDisplay && <p className="para" onClick={() => handleCancel(obj.orderId)}>Cancel Order</p>} </td> */}
                            <td><img src="/icons/view.png" alt="view" width="15vw" onClick={()=> {handleView(obj._id)}} /></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    )
}

    


export default PastOrders;
