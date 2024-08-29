import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from './ApiServices';
import ProductCard from './ProductCard';

const ProductList = ({userId,sortByValue,filterSectionItems}) => {
    const[productListItem,setProductListItem]=useState([]);

    useEffect(()=>{
        getProductListItem();
        
    },[])
    useEffect(()=>{
      sortByItems(sortByValue);
    },[sortByValue])
    useEffect(()=>{
      console.log("filter section items",filterSectionItems);
    },[filterSectionItems])
    const sortByItems = (inputFieldVal) =>{
      const tempProducts = [...productListItem];
      if(inputFieldVal==="lowToHigh"){
        tempProducts.sort((a,b)=>a.price-b.price);
      }
      else if(inputFieldVal==="highToLow"){
        tempProducts.sort((a,b)=>b.price-a.price);
      }
      else if(inputFieldVal==="newFirst"){
        tempProducts.sort((a, b) => {
          const dateA = new Date(a.productListingDate.split('-').reverse().join('-'));
          const dateB = new Date(b.productListingDate.split('-').reverse().join('-'));
          return dateB - dateA;
        });
      }
      else if(inputFieldVal==="oldItems"){
        tempProducts.sort((a, b) => {
          const dateA = new Date(a.productListingDate.split('-').reverse().join('-'));
          const dateB = new Date(b.productListingDate.split('-').reverse().join('-'));
          return dateA - dateB;
        });
      }
      setProductListItem(tempProducts);
    }

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
