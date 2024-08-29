import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from './ApiServices';
import ProductCard from './ProductCard';

const MyProducts = ({userId,setModalShow,setShowUpdate,showAddItem,setAddItemData,setCurrentEditingProductId,fetchMyProducts,setFetchMyProducts,sortByValue}) => {
    const [myProducts,setMyProducts]=useState([]);
    useEffect(()=>{
        getMyProductList();
    },[fetchMyProducts])
    useEffect(()=>{
      sortByItems(sortByValue);
    },[sortByValue])
    const sortByItems = (inputFieldVal) =>{
      const tempProducts = [...myProducts];
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
      setMyProducts(tempProducts);
    }
    const getMyProductList = async() =>{
        try{
            const response = await axios.get(`${BASE_URL}/products`,
            {
                params:{sellerId:userId}
            }
            );
            setMyProducts(response.data);
            setFetchMyProducts(false);
            // setFetchAgain(false);
          }
          catch(e){
            console.log(e);
            
          }
    }

    const deleteProduct = async(productId) =>{
      try{
        const response = await axios.delete(`${BASE_URL}/products/${productId}`)
        // setFetchAgain(true);
        getMyProductList();
      }
      catch(e){
        console.log(e);
      }
    }

    const handleEditProductClick = (productId) =>{
      const productToEdit = myProducts.find((product)=>product.id===productId);
      setAddItemData({
        productName: productToEdit.productName,
        price: productToEdit.price,
        category:productToEdit.category,
        productDescription: productToEdit.productDescription,
        productImg: productToEdit.productImg,
      })
      setCurrentEditingProductId(productId);
      setModalShow(true);
      setShowUpdate(true);
    }

  return (
    <>
      {myProducts.map((item,index)=>{
            return(
              <ProductCard key={index} item={item} handleEditProductClick={handleEditProductClick} deleteProduct={deleteProduct} showAddItem={showAddItem}/>
          )
        })}
    </>
  )
}

export default MyProducts
