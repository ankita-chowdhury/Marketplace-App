import React, { useState } from 'react'
import { useEffect} from 'react'
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const[productItem,setProductItem]=useState([]);
    useEffect(()=>{
        const loginKey=localStorage.getItem('loginKey');
        if(!loginKey){
          navigate('/login');
        }
        productApiCall();
      },[productItem])

      const productApiCall = async() =>{
        try{
          const response = await axios.get(`http://localhost:4500/products`);
          setProductItem(response.data);
        }
        catch(e){
          console.log(e);
          
        }
      }

  return (
    <div className='box-container'>
      <Navbar/>
      <div className="welcome-msg"><h2>Welcome Back!</h2></div>
      <div className="dasboard-container">
        <div className="filter-section">filter section</div>
        <div className="product-list-section">
          {productItem.map((item,index)=>{
            return(
              <ProductCard key={index} item={item}/>
          )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
