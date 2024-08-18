import React from 'react'

const ProductCard = ({item}) => {
  return (
    <>
      <div className="card-div">
        <div className="product-name"><h3>{item.productName}</h3></div>
        <div className="product-img"><img src={item.productImg} alt="" /></div>
        <div className="product-desc">{item.productDescription}</div>

        <div className="product-price"><h4>{item.rating>0 &&<span className={item.rating>4?"product-rating-green":item.rating<2?"product-rating-red":"product-rating-yellow"}>{item.rating}</span>} &#8377;{item.price}</h4></div>
        <div className="btn-div">
            <button className='view-details'>View Details</button>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default ProductCard
