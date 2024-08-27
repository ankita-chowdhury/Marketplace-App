import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import BASE_URL from './ApiServices';
import Updown from "../assets/images/Updown.png"

const Transaction = () => {
  const[purchaseItem,setPurchaseItem]=useState([]); 
  // const[totalPrice,setTotalPrice]=useState

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
                <th>Price<span className='updown-icon'><img src={Updown} alt="" /></span></th>
                <th>Purchase Date<span className='updown-icon'><img src={Updown} alt="" /></span></th>
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
