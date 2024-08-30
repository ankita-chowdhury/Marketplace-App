import React, { useState } from 'react'
import DetailsModal from './DetailsModal'

const ProductCard = ({item,showAddItem,deleteProduct,handleEditProductClick}) => {
    const[showDetailsModal,setShowDetailsModal]=useState(false);
    const[showDetailsState,setShowDetailsState]=useState(false);
    const handleBuyItem = (inputName) =>{
      setShowDetailsModal(true);
      if(inputName==='view-details'){
        setShowDetailsState(true);
      }
      else if(inputName==='buy-item'){
        setShowDetailsState(false);
      }
    }
  return (
    <>
      <div className="card-div">
        <div className="product-name"><h3>{item.productName}</h3></div>
        <div className="product-img"><img src={item.productImg} alt="" /></div>
        <div className="product-desc">{item.productDescription}</div>

        <div className="product-price"><h4>{!showAddItem && item.rating>0 &&<span className={item.rating>4?"product-rating-green":item.rating<2?"product-rating-red":"product-rating-yellow"}>{item.rating}</span>} &#8377;{item.price}</h4></div>
        {!showAddItem && <div className="btn-div">
            <button className='view-details' onClick={()=>handleBuyItem('view-details')}>View Details</button>
            <button className='add-to-cart' onClick={()=>handleBuyItem('buy-item')}>Buy Item</button>
        </div>}
        {showAddItem && <div className="btn-div">
            <button className='view-details' id='edit-btn' onClick={()=>handleEditProductClick(item.id)}>Edit</button>
            <button className='add-to-cart' id='delete-btn' onClick={()=>deleteProduct(item.id)}>Delete</button>
        </div>}
      </div>
      {showDetailsModal && <DetailsModal setShowDetailsModal={setShowDetailsModal} showDetailsState={showDetailsState} item={item}/>}
    </>
  )
}

export default ProductCard
