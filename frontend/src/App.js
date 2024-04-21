import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Search from './search';
import Signup from './signup';
import Details from './details';
import Navbar from './navbar';
import Cart from './cart';
import Order from './orders';

function App() {
  return (
    <div >      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Search/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='search' element={<Search/>}/> */}
        <Route path='/product/:id' element={<Details/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/search/:product' element={<Search/>}/>
        <Route path='/order/:user' element={<Order/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>

  );
}

export default App;
