import React, { useState } from 'react'
import { useEffect} from 'react'
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const[productItem,setProductItem]=useState([]);
    const[filteredProducts,setFilteredProducts]=useState([]);
    const[userDetails,setUserDetails]=useState({});
    useEffect(()=>{
        const loginKey=localStorage.getItem('loginKey');
        if(!loginKey){
          navigate('/login');
        }
        
        productApiCall();
        const parsedUser = JSON.parse(loginKey);
        getUserDetails(parsedUser);
        filterItems("productList","");
      },[])

      const productApiCall = async() =>{
        try{
          const response = await axios.get(`http://localhost:4500/products`);
          setProductItem(response.data);
        }
        catch(e){
          console.log(e);
          
        }
      }

      const getUserDetails = async(localData) =>{
        try{
          const response = await axios.get(`http://localhost:4500/users?email=${localData.email}`)
          setUserDetails(response.data[0]);
        }
        catch(e){
          console.log(e);
        }
      }

      const filterItems = (inputName,cateGory) =>{
        if(inputName==="myitems"){
            console.log("check",userDetails.id);
            const tempProducts=productItem.filter((item)=>item.sellerId===userDetails.id);
            setFilteredProducts(tempProducts);
          }
          else if(inputName==="productList"){
            const tempProducts=productItem.filter((item)=>item.sellerId!==userDetails.id);
            setFilteredProducts(tempProducts);
          }
      }

      const handleFilter = (inputName,cateGory) =>{
        filterItems(inputName,cateGory);
      }

  return (
    <div className='box-container'>
      <Navbar/>
      {/* <div className="welcome-msg"><h2>Welcome Back!</h2></div> */}
      <div className="top-section">
        <div className="select-section">
          <button onClick={()=>handleFilter("productList","")}>Products List</button>
          <button onClick={()=>handleFilter("myitems","")}>My Products</button>
        </div>
        <div className="sort-by">
          <label htmlFor="sortOptions">Sort by:</label>
          <select name="Sort by" id="sortOptions">
          <option value="">Price: Low to High</option>
          <option value="">Price: High to Low</option>
          <option value="">New First</option>
          <option value="">Old First</option>
  </select>
</div>

      </div>
      <div className="dasboard-container">
        <div className="filter-section">filter section</div>
        <div className="product-list-section">
          {filteredProducts.map((item,index)=>{
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
