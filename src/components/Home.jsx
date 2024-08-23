import React, { useState } from 'react'
import { useEffect} from 'react'
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import axios from 'axios';
import FilterSection from './FilterSection';

const Home = () => {
    const navigate = useNavigate();
    const[productItem,setProductItem]=useState([]);
    const[filteredProducts,setFilteredProducts]=useState([]);
    const[userDetails,setUserDetails]=useState({});
    const[showAddItem,setShowAddItem]=useState(false);
    const[modalShow,setModalShow]=useState(false);
    const[fetchAgain,setFetchAgain]=useState(false);
    const[showUpdate,setShowUpdate]=useState(false);
    const[addItemData,setAddItemData]=useState({
      productId: "",
      productName: "",
      productImg: "",
      productDescription: "",
      price: null,
      category: "",
      rating: 0.0,
      sellerId: "",
      buyerId: null,
      soldFlag: false,
      productListingDate: "",
    })
  const [currentEditingProductId, setCurrentEditingProductId] = useState(null);
  const[filterSectionItems,setFilterSectionItems]=useState([
    {name:"Electronics",check:false},
    {name:"Clothes",check:false},
    {name:"Audio Product",check:false},
    {name:"Gaming Product",check:false},
    {name:"Home Decor & Lights",check:false},
    {name:"Household Appliances",check:false},
    {name:"Smartphone",check:false},
    {name:"Fitness Equipment",check:false},
    {name:"Footwear",check:false}
]);
  
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
    
      useEffect(()=>{
      applyFilters();
    },[filterSectionItems])
    
    const applyFilters = () => {
      const activeFilters = filterSectionItems
        .filter((item) => item.check)
        .map((item) => item.name);
  
      filterItems("productList", activeFilters);
    };
      const productApiCall = async() =>{
        try{
          const response = await axios.get(`http://localhost:4500/products`);
          setProductItem(response.data);
          // setFetchAgain(false);
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

      const filterItems = (inputName, activeFilters) => {
        let tempProducts = productItem;
        console.log("activeFilters",activeFilters);
        // Apply category filtering
        if (activeFilters.length > 0) {
          tempProducts = tempProducts.filter((item) =>
            activeFilters.includes(item.category)
          );
        }
        console.log("temp products",tempProducts);
        if (inputName === "myitems") {
          tempProducts = tempProducts.filter(
            (item) => item.sellerId === userDetails.id
          );
          setShowAddItem(true);
        } else if (inputName === "productList") {
          tempProducts = tempProducts.filter(
            (item) => item.sellerId !== userDetails.id
          );
          setShowAddItem(false);
        }
    
        setFilteredProducts(tempProducts);
      };

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
        setAddItemData({
          productId: "",
          productName: "",
          productImg: "",
          productDescription: "",
          price: null,
          category: "",
          rating: 0.0,
          sellerId: "",
          buyerId: null,
          soldFlag: false,
          productListingDate: "",
        })
        if(modalShow===true){
          setModalShow(false);
          setShowUpdate(false);
        }
        else if(modalShow===false){
          setModalShow(true);
        }
      }

      const handleAddChange = (inputVal,inputName) =>{
        console.log("input->",inputVal);
          if(inputName==='item-name'){
            setAddItemData((oldItems)=>{
              return{...oldItems,productName:inputVal}
            })
          }
          else if(inputName==='item-price'){
            setAddItemData((oldItems)=>{
              return{...oldItems,price:inputVal}
            })
          }
          else if(inputName==="product-category"){
            setAddItemData((oldItems)=>{
              return{...oldItems,category:inputVal}
            })
          }
          else if(inputName==='item-desc'){
            setAddItemData((oldItems)=>{
              return{...oldItems,productDescription:inputVal}
            })
          }
          else if(inputName==='item-img'){
            setAddItemData((oldItems)=>{
              return{...oldItems,productImg:inputVal}
            })
          }
        const date=new Date();
        const fomattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        setAddItemData((oldItems)=>{
          return{...oldItems,sellerId:userDetails.id,productListingDate:fomattedDate}
        })

      }



      const handleAddItem = () =>{
          const response= axios.post(`http://localhost:4500/products`,addItemData)
          .then((response)=>{
              setModalShow(false);
              // setFetchAgain(true);
          })
          .catch((e)=>{
            console.log(e);
          })
      }

      const deleteProduct = async(productId) =>{
        try{
          const response = await axios.delete(`http://localhost:4500/products/${productId}`)
          console.log('Item deleted successfully:', response.data);
          // setFetchAgain(true);
        }
        catch(e){
          console.log(e);
        }
      }

      const handleEditProductClick = (productId) =>{
        const productToEdit = productItem.find((product)=>product.id===productId);
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

      const saveProductEdit = async() =>{
        try{
          const response = await axios.put(`http://localhost:4500/products/${currentEditingProductId}`, addItemData);
          console.log('Item updated successfully:', response.data);
          setModalShow(false);
          // setFetchAgain(true);
        }
        catch(e){
          console.log(e);
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
        <FilterSection filterSectionItems={filterSectionItems} setFilterSectionItems={setFilterSectionItems}/>
        <div className="product-list-section">
          {filteredProducts.map((item,index)=>{
            return(
              <ProductCard key={index} item={item} showAddItem={showAddItem} deleteProduct={deleteProduct} handleEditProductClick={handleEditProductClick}/>
          )
          })}
        </div>
      </div>
      {modalShow && <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-box-container" role="document">
            <div className="modal-heading">
                  {!showUpdate && <h4>Add Item</h4>}
                  {showUpdate && <h4>Update Item Details</h4>}
                  <span onClick={()=>handleModalShow()}>x</span>
            </div>
            <div className="modal-body">
              <label htmlFor="item-name">Product Name</label>
              <div>
                <input type="text" value={addItemData.productName} id='item-name' placeholder='Enter product name' onChange={(e)=>handleAddChange(e.target.value,'item-name')}/>
              </div>
              <label htmlFor="item-price">Product Price</label>
              <div>
                <input type="text" value={addItemData.price} id='item-price' placeholder='Enter product price' onChange={(e)=> handleAddChange(e.target.value,'item-price')}/>
              </div>
              <div className='select-category'>
                <label htmlFor="product-category">Product Category: </label>
                <select name="product-category" id="product-category" value={addItemData.category} onChange={(e)=>handleAddChange(e.target.value,"product-category")}>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Audio Product">Audio Product</option>
                  <option value="Gaming Product">Gaming Product</option>
                  <option value="Household Appliances">Household Appliances</option>
                  <option value="Home Decor & Lights">Home Decor & Lights</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Fitness Equipment">Fitness Equipment</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>
              <label htmlFor="item-desc">Product Description</label>
              <div>
                <textarea name='item-desc' id='item-desc' value={addItemData.productDescription} placeholder='Enter product description...' onChange={(e)=> handleAddChange(e.target.value,'item-desc')}/>
              </div>
              <label htmlFor="item-img">Product Image</label>
              <div>
                <input type="text" id='item-img' value={addItemData.productImg} placeholder='Enter product image-url' onChange={(e)=>handleAddChange(e.target.value,'item-img')}/>
              </div>
              <div className="add-item-form-btn">
              {!showUpdate && <button className='add-btn-save' onClick={()=>handleAddItem()}>Add</button>}
              {showUpdate &&<button className='add-btn-save' onClick={()=>saveProductEdit()}>Save Changes</button>} 
              <button className='add-btn-cancel'>Cancel</button>              
              </div>
              
            </div>
          </div>
      </div>}
      </div>
  )
}

export default Home
