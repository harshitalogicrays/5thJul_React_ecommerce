import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './components/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Admin from './components/Admin/Admin';
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import CheckoutDetails from './components/CheckoutDetails';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import MyOrders from './components/MyOrders';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';
function App() {
  return (
    <>
    <ToastContainer autoClose={2000} position='top-center'/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}>
             <Route path='addproduct' element={<AddProduct/>}/>
              <Route path='viewproducts' element={<ViewProducts/>}/>
              <Route path='edit/:id' element={<AddProduct/>}/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='order-details/:id' element={<OrderDetails/>}/>
      </Route>
      <Route path='/productdetails/:proid' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
      <Route path='*' element={<PageNotFound/>}/>
Vie
    </Routes>
    </>
  );
}

export default App;
 