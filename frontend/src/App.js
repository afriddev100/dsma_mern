import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import "./assets/styles/sb-admin-2.min.css"
import "./assets/styles/all.min.css"
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <ToastContainer />
      <Header></Header>
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
