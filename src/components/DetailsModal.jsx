import React from 'react'
import CloseIcon from '../assets/images/close.png'

const DetailsModal = ({setShowDetailsModal,showDetailsState,item}) => {
    const closeDetailsModal = () =>{
        setShowDetailsModal(false);
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
              <button className='add-btn-save'>Buy</button>
              <button className='add-btn-cancel' onClick={()=>closeDetailsModal()}>Cancel</button>              
              </div>}
            </div>
          </div>
      </div>
  )
}

export default DetailsModal
