import React from "react";
import CloseIcon from "../assets/images/close.png";

const PurchaseInvoice = ({ setPurchaseModal, item }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-box-container" role="document">
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

          <div className="show-details">
            <h4 className="product-desc">Category: {item.category}</h4>
            <div className="customer-rating"><h5>Give Rating:</h5></div>
            <p className="product-desc border-up-dashed">{item.productDescription}</p>
            <h5>Seller Id: {item.sellerId}</h5>
            <h5>Listed On: {item.productListingDate}</h5>
            <h3 className="border-up-dashed">Total Price: &#8377;{item.price}</h3>
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
