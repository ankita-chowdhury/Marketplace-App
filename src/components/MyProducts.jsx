import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from './ApiServices';
import ProductCard from './ProductCard';

const MyProducts = ({userId,setModalShow,setShowUpdate,showAddItem,setAddItemData}) => {
    const [myProducts,setMyProducts]=useState([]);
    // const [currentEditingProductId, setCurrentEditingProductId] = useState(null);
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

    const handleEditProductClick = (productId) =>{
      const productToEdit = myProducts.find((product)=>product.id===productId);
      console.log("productId",productToEdit);
      setAddItemData({
        productName: productToEdit.productName,
        price: productToEdit.price,
        category:productToEdit.category,
        productDescription: productToEdit.productDescription,
        productImg: productToEdit.productImg,
      })
      // setCurrentEditingProductId(productId);
      setModalShow(true);
      setShowUpdate(true);
    }

  return (
    <>
      {myProducts.map((item,index)=>{
            return(
              <ProductCard key={index} item={item} handleEditProductClick={handleEditProductClick} showAddItem={showAddItem}/>
          )
        })}
    </>
  )
}

export default MyProducts
