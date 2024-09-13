import React, { useState } from "react";
import CloseIcon from "../assets/images/close.png";
import axios from "axios";
import BASE_URL from "./ApiServices";

const PurchaseInvoice = ({ setPurchaseModal, item, setFetchAgain }) => {
  const [actionMsg, setActionMsg] = useState("");
  const [rating, setRating] = useState(parseFloat(item.rating || 0).toFixed(1)); // Convert rating to float with one decimal

  const giveRating = async (ratingVal) => {
    const floatRating = parseFloat(ratingVal).toFixed(1); // Convert to float with one decimal
    try {
      // Update rating in both product and transaction history
      await axios.patch(`${BASE_URL}/products/${item.productId}`, {
        rating: floatRating,
      });
      await axios.patch(`${BASE_URL}/transactionHistory/${item.id}`, {
        rating: floatRating,
      });
      setRating(floatRating); // Update the local state with formatted rating
      setActionMsg("Thanks for rating!");
      setTimeout(() => {
        setActionMsg("");
      }, 3000);
      setFetchAgain(true);
    } catch (e) {
      console.log(e);
    }
  };

  const downloadInvoice = () => {
    setActionMsg("Invoice Downloaded Successfully!");
    setTimeout(() => {
      setActionMsg("");
    }, 3000);
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-box-container" role="document">
        {actionMsg !== "" && <div className="action-msg-div">{actionMsg}</div>}
        <div className="modal-heading">
          <h2 className="text-align-center">Purchase Invoice</h2>
          <span onClick={() => setPurchaseModal(false)}>
            <img src={CloseIcon} alt="Close" />
          </span>
        </div>
        <div className="modal-body border-up-dashed">
          <h4>{item.productName}</h4>
          <div className="details-box">
            <span className="details-box-img">
              <img src={item.productImg} alt={item.productName} />
            </span>
          </div>
          <div className="customer-rating">
            <div className="rating">
              {[5, 4, 3, 2, 1].map((value) => (
                <React.Fragment key={value}>
                  <input
                    value={value}
                    checked={parseFloat(rating) === value} // Ensure checked comparison is a number
                    name="rating"
                    id={`star${value}`}
                    type="radio"
                    onChange={(e) => giveRating(e.target.value)}
                  />
                  <label
                    htmlFor={`star${value}`}
                    aria-label={`Rate ${value} stars`}
                  ></label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="show-details">
            <h4 className="product-desc">Category: {item.category}</h4>
            <p className="product-desc border-up-dashed">
              {item.productDescription}
            </p>
            <h5>Seller Id: {item.sellerId}</h5>
            <h5>Buyer Id: {item.buyerId}</h5>
            <h5>Listed On: {item.productListingDate}</h5>
            <h3 className="border-up-dashed">
              Total Price: &#8377;{item.price}
            </h3>
          </div>

          <div className="add-item-form-btn text-align-center">
            <button className="add-btn-save" onClick={downloadInvoice}>
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
