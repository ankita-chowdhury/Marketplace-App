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
    const[showAddItem,setShowAddItem]=useState(false);
    const[modalShow,setModalShow]=useState(false);
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
            setShowAddItem(true);
          }
          else if(inputName==="productList"){
            const tempProducts=productItem.filter((item)=>item.sellerId!==userDetails.id);
            setFilteredProducts(tempProducts);
            setShowAddItem(false);
          }
      }

      const handleFilter = (inputName,cateGory) =>{
        filterItems(inputName,cateGory);
      }

      const handleSortBy = (inputFieldVal) =>{
        console.log("inputVal",inputFieldVal);
        sortByItems(inputFieldVal);
      }

      const sortByItems = (inputFieldVal) =>{
        const tempProducts = [...filteredProducts];
        if(inputFieldVal==="lowToHigh"){
          tempProducts.sort((a,b)=>a.price-b.price);
        }
        else if(inputFieldVal==="highToLow"){
          tempProducts.sort((a,b)=>b.price-a.price);
        }
        else if(inputFieldVal==="newFirst"){
          tempProducts.sort((a,b)=>new Date(a.productListingDate) - new Date(b.productListingDate));
        }
        else if(inputFieldVal==="oldFirst"){
          tempProducts.sort((a,b)=>new Date(b.productListingDate) - new Date(a.productListingDate));
        }
        setFilteredProducts(tempProducts);
      }

      const handleModalShow = () =>{
        if(modalShow===true){
          setModalShow(false);
        }
        else if(modalShow===false){
          setModalShow(true);
        }
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
        <div className='add-and-sort-section'>
        {showAddItem && <div className="add-item" role='button' onClick={()=>handleModalShow()}>Add Item <span>+</span></div>}
        <div className="sort-by">
          <label htmlFor="sortOptions">Sort by:</label>
          <select name="Sort by" id="sortOptions" onChange={(e)=>handleSortBy(e.target.value)}>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="newFirst">New First</option>
          <option value="oldItems">Old First</option>
      </select>
        </div>
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
      {modalShow && <div className="modal" tabindex="-1" role="dialog">
        <div className="modal-box-container" role="document">
            <div className="modal-heading">
                  <h4>Add Item</h4>
                  <span onClick={()=>handleModalShow()}>x</span>
            </div>
            <div className="modal-body">
              <label htmlFor="item-name">Product Name</label>
              <div>
                <input type="text" id='item-name' placeholder='Enter product name'/>
              </div>
              <label htmlFor="item-price">Product Price</label>
              <div>
                <input type="text" id='item-price' placeholder='Enter product price'/>
              </div>
              <div className='select-category'>
                <label htmlFor="product-category">Product Category: </label>
                <select name="" id="product-category">
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Audio Product">Audio Product</option>
                  <option value="Gaming Product">Gaming Product</option>
                  <option value="Household Appliances">Household Appliances</option>
                  <option value="Home Decor & Lights">Home Decor & Lights</option>
                  <option value="Smartphone">Smartphone</option>
                </select>
              </div>
              <label htmlFor="item-desc">Product Description</label>
              <div>
                <textarea name="" id='item-desc' placeholder='Enter product description...'/>
              </div>
              <label htmlFor="item-img">Product Image</label>
              <div>
                <input type="text" id='item-img' placeholder='Enter product image-url'/>
              </div>
              <div className="add-item-form-btn">
                <button className='add-btn-save'>Add</button>
                <button className='add-btn-cancel'>Cancel</button>
              </div>
            </div>
          </div>
      </div>}
      </div>
  )
}

export default Home
