import React from "react";
import Footer from "./footer/footer";
import OrderNavbar from "./navbar/navbar";
import ProductRow from "./productsRow/row";
import Sidebar from "./sideNavBar/sidebar";

const CreateOrders = ()=> {
    return (
        <>
            <OrderNavbar/>
            <Sidebar/>
            <div
                className="catelog-container"
                style={{ height: "85vh", marginLeft: "4vw" }}
            >
                <div className="catelog-container-hero" style={{ height: "10vh" }}>
                    <div style={{ position: "absolute", padding: "5vh 5vw" }}>
                        Create Order
                    </div>
                    <div style={{ float: "right", margin: "5vh 5vw" }}>
                        <div
                            style={{
                                display: "inline-block",
                                borderBottom: "1px solid gray",
                            }}
                        >
                            <img src="./icons/search.svg" alt="search" />
                            <input type="text" style={{ border: "none" }} />
                        </div>
                    </div>
                </div>
                <div style={{ margin: "0 5vw" }}>
                    <ProductRow />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CreateOrders;