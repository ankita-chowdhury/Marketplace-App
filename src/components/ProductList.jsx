import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from './ApiServices';
import ProductCard from './ProductCard';

const ProductList = ({userId,sortByValue,filterSectionItems}) => {
    const[productListItem,setProductListItem]=useState([]);
    const[filterProducts,setFilterProducts]=useState([]);

    useEffect(()=>{
        getProductListItem();
    },[userId])
    useEffect(()=>{
      sortByItems(sortByValue);
    },[sortByValue])
    useEffect(()=>{
      applyFilters();
    },[filterSectionItems])
    const applyFilters = () => {
      const activeFilters = filterSectionItems
        .filter((item) => item.check)
        .map((item) => item.name);
        filterItems(activeFilters);
    };

    const filterItems = (activeFilters) => {
      let tempProducts = [...productListItem];
      // Apply category filtering
      if (activeFilters.length > 0) {
        tempProducts = tempProducts.filter((item) =>
          activeFilters.includes(item.category)
        );
      }
      setFilterProducts(tempProducts);
    };

    const sortByItems = (inputFieldVal) =>{
      const tempProducts = [...filterProducts];
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
      setFilterProducts(tempProducts);
    }

   const getProductListItem = async() =>{
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            const tempProducts = response.data;
            const filterItems  = tempProducts.filter((item)=>item.sellerId!==userId)
            setProductListItem(filterItems);
            setFilterProducts(filterItems);
        } 
        catch (e) {
            console.log(e);
        }
    }
  return (
    <>
      {
        filterProducts.map((item,index)=>{
            return(
              <ProductCard key={index} item={item}/>
          )
        })
      }
    </>
  )
}

export default ProductList
