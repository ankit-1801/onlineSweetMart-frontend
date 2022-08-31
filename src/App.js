import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { CartProvider } from "react-use-cart";
import Login from './components/Login';
import Signup from './components/Signup';
import AdminOrders from './components/AdminOrders';
import AdminProduct from './components/AdminProduct';
import Logout from './components/Logout';
import MyDetails from './components/MyDetails';
import MyOders from './components/MyOrders';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <Navbar/>
      <Routes>
      <Route path='/'element={<Home/>} /> 
      <Route path='/login'element={<Login/>} /> 
      <Route path='/signup'element={<Signup/>} /> 
      <Route path='/admin/orders'element={<AdminOrders/>} /> 
      <Route path='/admin/products'element={<AdminProduct/>} />  
      <Route path='/logout'element={<Logout/>} />  
      <Route path='/user/details'element={<MyDetails/>} />  
      <Route path='/user/orders'element={<MyOders/>} />  
      <Route path="/user/product/update/:id" element={<UpdateProduct/>} />  
      </Routes>
      <Footer/>
      </CartProvider>    
    </BrowserRouter> 
  );
}

export default App;
