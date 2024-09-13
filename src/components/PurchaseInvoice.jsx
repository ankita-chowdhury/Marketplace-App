import React, { useRef, useState } from "react";
import CloseIcon from "../assets/images/close.png";
import axios from "axios";
import BASE_URL from "./ApiServices";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PurchaseInvoice = ({ setPurchaseModal, item, setFetchAgain }) => {
  const [actionMsg, setActionMsg] = useState("");
  const [rating, setRating] = useState(parseFloat(item.rating || 0).toFixed(1)); // Convert rating to float with one decimal
  const transactionRef = useRef();

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

  const downloadInvoice = async () => {
    const element = transactionRef.current;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    // Wait for the scroll to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Scroll up by an additional 50px
    window.scrollBy({ top: -150, behavior: "smooth" });

    // Wait again to ensure the scroll adjustment is completed
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Wait for all images in the element to load
    const images = element.getElementsByTagName("img");
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(); // Image is already loaded
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even if there is an error loading the image
        }
      });
    });

    // Wait for all image load promises to complete
    await Promise.all(promises);

    // Convert the loaded element to a canvas
    const canvas = await html2canvas(element, {
      useCORS: true, // Ensure cross-origin images are handled
    });

    const data = canvas.toDataURL("image/png");

    // Create a PDF with the canvas data
    const pdf = new jsPDF("p", "mm", "a3");

    // Add padding
    const padding = 10; // 10mm padding
    const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
    const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * padding;

    // Get image properties to maintain aspect ratio
    const imageProps = pdf.getImageProperties(data);
    const imageWidth = pdfWidth;
    const imageHeight = (imageProps.height * imageWidth) / imageProps.width;

    // Add image to PDF with padding
    pdf.addImage(data, "PNG", padding, padding, imageWidth, imageHeight);

    pdf.save("transaction-history.pdf");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActionMsg("Invoice Downloaded Successfully!");
    setTimeout(() => {
      setActionMsg("");
    }, 3000);
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-box-container" role="document">
        <div id="purchase-invoice" ref={transactionRef}>
          <div className="modal-heading">
            <h2 className="text-align-center">Purchase Invoice</h2>
            <span onClick={() => setPurchaseModal(false)}>
              <img src={CloseIcon} alt="Close" />
            </span>
          </div>
          <div className="modal-body border-up-dashed">
          {actionMsg !== "" && (
              <div className="action-msg-div margin-top-10">{actionMsg}</div>
            )}
            <h4>{item.productName}</h4>
            <div className="details-box">
              <span className="purchase-box-img">
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
              <h5>Purchase Date: {item.productPurchaseDate}</h5>
              <h3 className="border-up-dashed">
                Total Price: &#8377;{item.price}
              </h3>
            </div>
          </div>
        </div>
        <div className="add-item-form-btn text-align-center">
          <button className="add-btn-save" onClick={downloadInvoice}>
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
