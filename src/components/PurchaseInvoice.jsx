import React from "react";
import CloseIcon from "../assets/images/close.png";

const PurchaseInvoice = ({ setPurchaseModal, item }) => {

    const giveRating = (ratingVal) =>{
        console.log("rating val-->",ratingVal);    
    }
  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-box-container" role="document">
      <div className="action-msg-div">Thanks For rating!</div>
        <div className="modal-heading">
          <h2 className="text-align-center">Purchase Invoice</h2>
          <span onClick={() => setPurchaseModal(false)}>
            {" "}
            <img src={CloseIcon} alt="" />{" "}
          </span>
        </div>
        <div className="modal-body border-up-dashed">
          <h4>{item.productName}</h4>
          <div className="details-box">
            <span className="details-box-img">
              <img src={item.productImg} alt="" />
            </span>
            
          </div>
          <div className="customer-rating">
              <div className="rating">
                <input value="5" name="rating" id="star5" type="radio" onChange={(e)=>giveRating(e.target.value)} />
                <label htmlFor="star5"></label>
                <input value="4" name="rating" id="star4" type="radio" onChange={(e)=>giveRating(e.target.value)} />
                <label htmlFor="star4"></label>
                <input value="3" name="rating" id="star3" type="radio" onChange={(e)=>giveRating(e.target.value)} />
                <label htmlFor="star3"></label>
                <input value="2" name="rating" id="star2" type="radio" onChange={(e)=>giveRating(e.target.value)} />
                <label htmlFor="star2"></label>
                <input value="1" name="rating" id="star1" type="radio" onChange={(e)=>giveRating(e.target.value)} />
                <label htmlFor="star1"></label>
              </div>
            </div>

          <div className="show-details">
            <h4 className="product-desc">Category: {item.category}</h4>
            <p className="product-desc border-up-dashed">
              {item.productDescription}
            </p>
            <h5>Seller Id: {item.sellerId}</h5>
            <h5>Listed On: {item.productListingDate}</h5>
            <h3 className="border-up-dashed">
              Total Price: &#8377;{item.price}
            </h3>
          </div>

          <div className="add-item-form-btn text-align-center">
            <button className="add-btn-save">Download Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
