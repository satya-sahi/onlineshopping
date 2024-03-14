
import useFetch from './services/useFetch';
import './App.css';
import Spinner from './Spinner'
import PageNotFound from './PageNotFound';
import { Link } from 'react-router-dom';

function Products() {
  const {data:products,error,loading} = useFetch('')
  function renderProduct(p){
    return (
      <>
      <div key={p.id} className="product" >
        <Link to={`${p.id}`}>
        <img src='https://picsum.photos/200/300' className="productImage" alt={p.name}  />
          <h3><b>{p.name}</b></h3>
          <p>{p.price}</p>
        </Link>
      </div>
      </>
    )
  } 
if (error) throw error;
if (loading) return <Spinner />
if (products.length===0) return <PageNotFound />
  return (
    <>
      <div className="App">
        <body>
          <h4>Please select from the following list of products to your cart.</h4>
            <section className=''>
              {products.map(p=>renderProduct(p))}
            </section>
        </body>

      </div>
    </>
  );
}

export default Products;
