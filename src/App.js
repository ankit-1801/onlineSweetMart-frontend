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
import AdminHome from './components/AdminHome';
import UpdateUser from './components/UpdateUser';
import OrderDetails from './components/OrderDetails';
import PrivateRoutes from './Utils/PrivateRoutes';

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Navbar />
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Home />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path='/admin/orders' element={<AdminOrders />} />
                        <Route path='/admin/products' element={<AdminProduct />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/user/orders' element={<MyOders />} />
                        <Route path='/admin/home' element={<AdminHome />} />
                        <Route path='/user/details/:id' element={<MyDetails />} />
                        <Route path="/user/product/update/:id" element={<UpdateProduct />} />
                        <Route path="/user/update/:id" element={<UpdateUser />} />
                        <Route path="/order/details/:id" element={<OrderDetails />} />
                    </Route>
                </Routes>
                <Footer />
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
