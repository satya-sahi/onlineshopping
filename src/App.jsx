
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import Details from './Details';
import Cart from './Cart';
import Checkout from './Checkout';



function App() {


  return (
    <>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome User</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<Details />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
