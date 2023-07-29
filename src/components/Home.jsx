import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import ErrorComponent from './error';
import Loader from './loader';

const Home = () => {

  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const product = async () => {
      try {
        const fet = await fetch("https://dummyjson.com/products")
        const product = await fet.json()
        setItems(product.products)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    product()

  }, [])
  console.log(items);
  const dispatch = useDispatch();
  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options })
    dispatch({ type: "calculatePrice" })
    toast.success('Added To Cart')
  }

  if (error) return <ErrorComponent message="Error While Fetching Products. Please try again later" />

  return (
    <div className='home'>
      {loading ? (
        <Loader />
      ) : (<>
        {items.map(i => (
          <ProductCard
            key={i.id}
            imgSrc={i.images[0]}
            name={i.title}
            price={i.price}
            id={i.id}
            handler={addToCartHandler}
          />))}
      </>)}
    </div>
  )
}


const ProductCard = ({ name, id, price, handler, imgSrc }) => {
  return (
    <div className='productcart'>
      <img src={(imgSrc == null) ? "https://i.dummyjson.com/data/products/21/1.png" : imgSrc} alt={name} />
      <p>{name}</p>
      <h4>${price}</h4>
      <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
        Add to Cart
      </button>
    </div>
  )
}


export default Home


