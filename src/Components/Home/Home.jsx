import React from 'react'
 import Navbaar from '../Navbaar/Navbaar'
import Hero from '../Hero/Hero';
 import Category from '../Category/Category';
import Values from '../Values/Values';
import Products from '../Products/Products';
const Home = () => {
  return (
    <div>
       <Navbaar/>
       <Hero/>
       <Category/>
       <Values/>
       <Products/>
    </div>
  )
}

export default Home
