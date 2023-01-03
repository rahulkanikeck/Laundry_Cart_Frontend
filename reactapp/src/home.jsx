import React , {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import OrderHeader from "./navbar/navbar";
import Sidebar from "./sideNavBar/sidebar";
import { getToken } from "./authOperations";
import Footer from "./footer/footer";
import PastOrders from "./pastOrders/pastOrders";
const URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

const Home = ()=> {

    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        const token = getToken("token");
        console.log(token);

        fetch(URL + "/api/v1/orders/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((response) => {
                //if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data) => {
                setFetchedData(data.orders);
                console.log(data);
            });
    }, []);

      const handleCreateClick = () => {
        navigate("/createorder");
      };
      
    return (
        <>
            <OrderHeader />
            <Sidebar />
            
            <div
                className="home-container"
                style={{ height: "85vh", marginLeft: "4vw" }}
            >
                <div className="home-container-hero" style={{ height: "10vh" }}>
                    <div>
                        {fetchedData?.length ? (
                            <div htmlFor="order-count" style={{ position: "absolute", padding: "5vh 5vw" }}>
                                Orders | {fetchedData?.length}
                            </div>
                        ) : (
                            <div htmlFor="order-count" style={{ position: "absolute", padding: "5vh 5vw" }}>
                                Orders | 0
                            </div>
                        )
                        }
                    </div>
                    
                    <div style={{ float: "right", margin: "5vh 5vw" }}>
                        {fetchedData?.length ? (
                            <button className="btn-vt" onClick={() => handleCreateClick()}>
                                Create
                            </button>
                        ) : (
                            <></>
                        )}
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
                    {fetchedData?.length ? (
                        <PastOrders data={fetchedData} />
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "60vh",
                                flexDirection: "column",
                            }}
                        >
                            <p style={{ color: "#222B45", opacity: "0.5" }}>
                                No Orders available
                            </p>
                            <button className="btn-vt" onClick={() => handleCreateClick()}>
                                Create
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer/>
        </>
    )
}
  
export default Home;