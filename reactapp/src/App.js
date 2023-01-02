import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeFooter from "./Footer(HOME)/Footer";
import HomeHeader from "./Header(HOME)/header";
import Register from "./Register Page/Register";
import SignIn from "./SignIn Page/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
