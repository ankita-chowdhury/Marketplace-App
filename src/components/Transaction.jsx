import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import BASE_URL from './ApiServices';
import Updown from "../assets/images/Updown.png"

const Transaction = () => {
  const[purchaseItem,setPurchaseItem]=useState([]); 
  const[sortState,setSortState]=useState('asc');

  useEffect(()=>{
    getTransactionList();
  },[])

  const getTransactionList = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/transactionHistory`);
      setPurchaseItem(response.data);
    }
    catch(e){
      console.log(e);
    }

  }

  const handleSortChange = (inputName) =>{
    if(sortState==='asc'){
      setSortState('desc');
    }
    else if(sortState==='desc'){
      setSortState('asc');
    }
    handleSort(inputName);
  }

  const handleSort = (inputField) =>{
    const tempProducts=[...purchaseItem];
    if(sortState==="asc"){
        if(inputField==='price'){
          tempProducts.sort((a,b)=>a.price - b.price);
        }
        else if(inputField==='purchase-date'){
          tempProducts.sort((a, b) => {
            const dateA = new Date(a.productPurchaseDate.split('-').reverse().join('-'));
            const dateB = new Date(b.productPurchaseDate.split('-').reverse().join('-'));
            return dateA - dateB;
          });
        }
    }
    else if(sortState==="desc"){
      if(inputField==='price'){
        tempProducts.sort((a,b)=>b.price - a.price);
      }
      else if(inputField==='purchase-date'){
        tempProducts.sort((a, b) => {
          const dateA = new Date(a.productPurchaseDate.split('-').reverse().join('-'));
          const dateB = new Date(b.productPurchaseDate.split('-').reverse().join('-'));
          return dateB - dateA;
        });
      }
    }
    setPurchaseItem(tempProducts);
}
  return (
    <div className='box-container'>
      <Navbar/>
      <div className="inner-transaction-div">
        <h2>Transaction History</h2>
        <hr />
        
        <div className="transaction-item-div">
        {purchaseItem.length===0 && <div className="no-items-div">No items are available!</div>}
          {purchaseItem.length>0 && <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price<span className='updown-icon' onClick={()=>handleSortChange('price')}><img src={Updown} alt="" /></span></th>
                <th>Purchase Date<span className='updown-icon' onClick={()=>handleSortChange('purchase-date')}><img src={Updown} alt="" /></span></th>
              </tr>
            </thead>
            <tbody>
              {purchaseItem.map((item,i)=>{
                return(
                  <>
                    <tr className='transaction-card'>
                    <td><div className="image-container"><img src={item.productImg} alt="" /></div></td>
                    <td>{item.productName}</td>
                    <td className='transaction-price'>&#8377;{item.price}</td>
                    <td>{item.productPurchaseDate}</td>
                   </tr>
                  </>
              )
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  )
}

export default Transaction
