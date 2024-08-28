import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from './ApiServices';
import ProductCard from './ProductCard';

const MyProducts = ({userId}) => {
    const [myProducts,setMyProducts]=useState([]);
    useEffect(()=>{
        getMyProductList();
    },[])
    const getMyProductList = async() =>{
        try{
            const response = await axios.get(`${BASE_URL}/products`,
            {
                params:{sellerId:userId}
            }
            );
            setMyProducts(response.data);
            // setFetchAgain(false);
          }
          catch(e){
            console.log(e);
            
          }
    }
  return (
    <>
      {myProducts.map((item,index)=>{
            return(
              <ProductCard key={index} item={item}/>
          )
        })}
    </>
  )
}

export default MyProducts
