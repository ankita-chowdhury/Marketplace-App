import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from './ApiServices';
import ProductCard from './ProductCard';

const ProductList = ({userId,sortByValue}) => {
    const[productListItem,setProductListItem]=useState([]);

    useEffect(()=>{
        getProductListItem();
        
    },[])

   const getProductListItem = async() =>{
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            const tempProducts = response.data;
            const filterProducts  = tempProducts.filter((item)=>item.sellerId!==userId)
            console.log("filterProducts",filterProducts);
            setProductListItem(filterProducts);
        } 
        catch (e) {
            console.log(e);
        }
    }
  return (
    <>
      {
        productListItem.map((item,index)=>{
            return(
              <ProductCard key={index} item={item}/>
          )
        })
      }
    </>
  )
}

export default ProductList
