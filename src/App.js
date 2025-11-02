import "./App.css";
import NavBar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import SignUp from "./pages/Signup";
import Login from "./pages/UserLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Protected from "./utils/RouteProtector";
import AdminUsers from "./pages/AdminUsers";
import MyProfile from "./pages/MyProfile";
// import "primereact/resources/themes/lara-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //flex
import { AlertContainer } from "./utils/alerts";
import Applications from "./pages/applications";
function App({ Component, pageProps }) {
  return (
    <>
      <AlertContainer />
      <div className="flex flex-column h-screen">
        <Router>
          <NavBar />
          <div className="flex-grow-1 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route element={<Protected />}>
                <Route
                  exact
                  path="/applications"
                  element={<Applications />}
                ></Route>
                <Route exact path="/my-profile" element={<MyProfile />}></Route>
                <Route exact path="/users" element={<AdminUsers />}></Route>
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;