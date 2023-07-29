import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'



const Home = () => {
  
  const [items, setItems] = useState([])

  useEffect(() => {
    const product = async () => {
      const fet = await fetch("https://dummyjson.com/products")
      const product = await fet.json()
      setItems(product.products)
    }
    product()
 
  }, []) 

  const dispatch = useDispatch();
  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options })
    dispatch({ type: "calculatePrice" })
    toast.success('Added To Cart')
  }

  return (
    <div className='home'>
      {items.map(i => (
        <ProductCard
          key={i.id}
          imgSrc={i.images[0]}
          name={i.title}
          price={i.price}
          id={i.id}
          handler={addToCartHandler}
        />))}
    </div>
  )
}


const ProductCard = ({ name, id, price, handler, imgSrc }) => {
  return (
    <div className='productcart'>
      <img src={imgSrc} alt={name} />
      <p>{name}</p>
      <h4>${price}</h4>
      <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
        Add to Cart
      </button>
    </div>
  )
}


export default Home


