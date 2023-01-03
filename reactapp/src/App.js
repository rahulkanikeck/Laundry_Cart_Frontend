import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateOrders from "./createOrder";
import Home from "./home";
import Register from "./Register Page/Register";
import SignIn from "./SignIn Page/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Home />} />
          <Route path="/createorder" element={<CreateOrders />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
