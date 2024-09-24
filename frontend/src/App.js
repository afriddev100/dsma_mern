import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <>
    <ToastContainer />
    <Header></Header>
    <Outlet></Outlet>
    <Footer />
  </>
  );
}

export default App;
