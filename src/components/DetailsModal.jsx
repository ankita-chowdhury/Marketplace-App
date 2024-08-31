import React from 'react'
import CloseIcon from '../assets/images/close.png'
import axios from 'axios'
import BASE_URL from './ApiServices';

const DetailsModal = ({setShowDetailsModal,showDetailsState,item,setFetchProductList}) => {
    const closeDetailsModal = () =>{
        setShowDetailsModal(false);
    }

    const submitBuyItem = () =>{
        axios.patch(`${BASE_URL}/products/${item.id}`,{
            soldFlag:true
        })
        .then((res)=>{
            const userId=sessionStorage.getItem('userId');
            const parsedUserId = JSON.parse(userId);
            const date=new Date();
            const fomattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            const bodyData = {
                productId: item.id,
                productName: item.productName,
                price: item.price,
                category: item.category,
                productImg: item.productImg,
                sellerId: item.sellerId,
                buyerId: parsedUserId,
                productListingDate: item.productListingDate,
                productPurchaseDate: fomattedDate,
              }
            axios.post(`${BASE_URL}/transactionHistory`,bodyData)
            setShowDetailsModal(false);
            setFetchProductList(true);
            
        })
    }
  return (
   <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-box-container" role="document">
            <div className="modal-heading">
                   {showDetailsState && <h3>View Details</h3>}
                   {!showDetailsState && <h3>Buy Item</h3>}
                  <span onClick={()=>closeDetailsModal()}> <img src={CloseIcon} alt="" /> </span>
            </div>
            <div className="modal-body">
                <div className='details-box'>
                    <span className='details-box-img'><img src={item.productImg} alt="" /></span>
                    <div className="product-details">
                        <h4>{item.productName}</h4>
                        <h4>{item.rating>0 &&<span className={item.rating>4?"product-rating-green":item.rating<2?"product-rating-red":"product-rating-yellow"}>{item.rating}</span>} &#8377;{item.price}</h4>
                    </div>
                </div>
                {showDetailsState && <div className="show-details">
                <h4 className="product-desc">Category: {item.category}</h4>
                    <p className="product-desc">{item.productDescription}</p>
                    <h5>Seller Id: {item.sellerId}</h5>
                    <h5>Listed On: {item.productListingDate}</h5>
                </div>}
              {!showDetailsState && <div className="add-item-form-btn">
              <button className='add-btn-save' onClick={()=>submitBuyItem()}>Buy</button>
              <button className='add-btn-cancel' onClick={()=>closeDetailsModal()}>Cancel</button>              
              </div>}
            </div>
          </div>
      </div>
  )
}

export default DetailsModal
