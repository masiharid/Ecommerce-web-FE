import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import Card from '../Home/Card';
import Navbar from '../Home/Navbar';
import animationData from "../Animation/93948-wait-loading-animation.json";
import axios from 'axios';

function Products({ cart, value, handleToCart }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from the backend API
    axios.get('http://localhost:4000/Product')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        setIsLoading(false);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Navbar cart={cart} />
      <div className="container">
        <section className="row py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {
                isLoading ? (
                  <Lottie options={defaultOptions} height={400} width={400} />
                ) : (
                  data.map((item, index) => (
                    <Card key={index} item={item} value={value} handleToCart={handleToCart} />
                  ))
                )
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Products;