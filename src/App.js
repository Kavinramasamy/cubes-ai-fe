import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./pages/admin_login";
import AdminSignUp from "./pages/admin_signup";
import HomePage from "./pages/home_page";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<AdminLogin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<AdminSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
