import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import axios from "axios";
import FilterSection from "./FilterSection";
import BASE_URL from "./ApiServices";
import MyProducts from "./MyProducts";
import ProductList from "./ProductList";
import CloseIcon from "../assets/images/close.png";


const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [showAddItem, setShowAddItem] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentEditingProductId, setCurrentEditingProductId] = useState(null);
  const[searchResult,setSearchResult]=useState("");
  const [addItemData, setAddItemData] = useState({
    productName: "",
    productImg: "",
    productDescription: "",
    price: 0.0,
    category: "",
    rating: 0.0,
    sellerId: "",
    buyerId: "",
    soldFlag: false,
    productListingDate: "",
  });
  const [filterSectionItems, setFilterSectionItems] = useState([
    { name: "Electronics", check: false },
    { name: "Clothes", check: false },
    { name: "Audio Product", check: false },
    { name: "Gaming Product", check: false },
    { name: "Home Decor & Lights", check: false },
    { name: "Household Appliances", check: false },
    { name: "Smartphone", check: false },
    { name: "Fitness Equipment", check: false },
    { name: "Footwear", check: false },
  ]);

  const [fetchMyProducts, setFetchMyProducts] = useState(false);
  const [sortByValue, setSortByValue] = useState("");
  const [couponCount, setCouponCount] = useState(0);
  const [soldCouponCount, setSoldCouponCount] = useState(0);
  const[actionMsg,setActionMsg]=useState("");

  useEffect(() => {
    const loginKey = localStorage.getItem("loginKey");
    if (!loginKey) {
      navigate("/login");
    }
    const parsedUser = JSON.parse(loginKey);
    getUserDetails(parsedUser);
    console.log("coupon-> ",couponCount);
  }, [couponCount]);

  const getUserDetails = async (localData) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users?email=${localData.email}`
      );
      setUserDetails(response.data[0]);
      sessionStorage.setItem("userId", JSON.stringify(response.data[0].id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilter = (inputName) => {
    if (inputName === "myitems") {
      setShowAddItem(true);
    } else if (inputName === "productList") {
      setShowAddItem(false);
    }
  };

  const handleSortBy = (inputFieldVal) => {
    setSortByValue(inputFieldVal);
  };

  const handleModalShow = () => {
    setAddItemData({
      productName: "",
      productImg: "",
      productDescription: "",
      price: 0.0,
      category: "",
      rating: 0.0,
      sellerId: "",
      buyerId: "",
      soldFlag: false,
      productListingDate: "",
    });
    if (modalShow === true) {
      setModalShow(false);
      setShowUpdate(false);
    } else if (modalShow === false) {
      setModalShow(true);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
    setShowUpdate(false);
  };

  const handleAddChange = (inputVal, inputName) => {
    if (inputName === "item-name") {
      setAddItemData((oldItems) => {
        return { ...oldItems, productName: inputVal };
      });
    } else if (inputName === "item-price") {
      setAddItemData((oldItems) => {
        return { ...oldItems, price: Number(inputVal) };
      });
    } else if (inputName === "product-category") {
      setAddItemData((oldItems) => {
        return { ...oldItems, category: inputVal };
      });
    } else if (inputName === "item-desc") {
      setAddItemData((oldItems) => {
        return { ...oldItems, productDescription: inputVal };
      });
    } else if (inputName === "item-img") {
      setAddItemData((oldItems) => {
        return { ...oldItems, productImg: inputVal };
      });
    }
    const date = new Date();
    const fomattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    setAddItemData((oldItems) => {
      return {
        ...oldItems,
        sellerId: userDetails.id,
        productListingDate: fomattedDate,
      };
    });
  };

  const handleAddItem = () => {
    axios
      .post(`${BASE_URL}/products`, addItemData)
      .then((response) => {
        setModalShow(false);
        setFetchMyProducts(true);
        setActionMsg("Product Added Successfully!");
      setTimeout(()=>{
        setActionMsg("");
      },3000)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveProductEdit = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/products/${currentEditingProductId}`,
        addItemData
      );
      setModalShow(false);
      // setFetchAgain(true);
      setFetchMyProducts(true);
      setActionMsg("Product Details Updated Successfully!");
      setTimeout(()=>{
        setActionMsg("");
      },3000)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="box-container">
      <Navbar setSearchResult={setSearchResult}/>
      {/* <div className="welcome-msg"><h2>Welcome Back!</h2></div> */}
      <div className="top-section">
        <div className="select-section">
          <button onClick={() => handleFilter("productList", "")}>
            Products List
          </button>
          <button onClick={() => handleFilter("myitems", "")}>
            My Products
          </button>
        </div>
        {actionMsg==="" && <div className="count-div"><span>Total Items: {couponCount} | Sold Items: {soldCouponCount}</span></div>}
        {actionMsg!=="" && <div className="action-msg-div">{actionMsg}</div>}
        <div className="add-and-sort-section">
          {showAddItem && (
            <div
              className="add-item"
              role="button"
              onClick={() => handleModalShow()}
            >
              Add Item <span>+</span>
            </div>
          )}
          <div className="sort-by">
            <label htmlFor="sortOptions">Sort by:</label>
            <select
              name="Sort by"
              id="sortOptions"
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="newFirst">New First</option>
              <option value="oldItems">Old First</option>
            </select>
          </div>
        </div>
      </div>
      <div className="dasboard-container">
        <FilterSection
          filterSectionItems={filterSectionItems}
          setFilterSectionItems={setFilterSectionItems}
        />
        <div className="product-list-section">
          {showAddItem ? (
            <MyProducts
              userId={userDetails?.id}
              setModalShow={setModalShow}
              setShowUpdate={setShowUpdate}
              showAddItem={showAddItem}
              setAddItemData={setAddItemData}
              setCurrentEditingProductId={setCurrentEditingProductId}
              fetchMyProducts={fetchMyProducts}
              setFetchMyProducts={setFetchMyProducts}
              sortByValue={sortByValue}
              filterSectionItems={filterSectionItems}
              setCouponCount={setCouponCount}
              setSoldCouponCount={setSoldCouponCount}
              setActionMsg={setActionMsg}
              searchResult={searchResult}
            />
          ) : (
            <ProductList
              userId={userDetails?.id}
              sortByValue={sortByValue}
              filterSectionItems={filterSectionItems}
              setCouponCount={setCouponCount}
              setSoldCouponCount={setSoldCouponCount}
              setActionMsg={setActionMsg}
              searchResult={searchResult}
            />
          )}
        </div>
      </div>
      {modalShow && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-box-container" role="document">
            <div className="modal-heading">
              {!showUpdate && <h4>Add Item</h4>}
              {showUpdate && <h4>Update Item Details</h4>}
              <span onClick={() => handleModalClose()}>
                {" "}
                <img src={CloseIcon} alt="" />{" "}
              </span>
            </div>
            <div className="modal-body">
              <label htmlFor="item-name">Product Name</label>
              <div>
                <input
                  type="text"
                  value={addItemData.productName}
                  id="item-name"
                  placeholder="Enter product name"
                  onChange={(e) => handleAddChange(e.target.value, "item-name")}
                />
              </div>
              <label htmlFor="item-price">Product Price</label>
              <div>
                <input
                  type="number"
                  value={addItemData.price}
                  id="item-price"
                  placeholder="Enter product price"
                  onChange={(e) =>
                    handleAddChange(e.target.value, "item-price")
                  }
                />
              </div>
              <div className="select-category">
                <label htmlFor="product-category">Product Category: </label>
                <select
                  name="product-category"
                  id="product-category"
                  value={addItemData.category}
                  onChange={(e) =>
                    handleAddChange(e.target.value, "product-category")
                  }
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Audio Product">Audio Product</option>
                  <option value="Gaming Product">Gaming Product</option>
                  <option value="Household Appliances">
                    Household Appliances
                  </option>
                  <option value="Home Decor & Lights">
                    Home Decor & Lights
                  </option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Fitness Equipment">Fitness Equipment</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>
              <label htmlFor="item-desc">Product Description</label>
              <div>
                <textarea
                  name="item-desc"
                  id="item-desc"
                  value={addItemData.productDescription}
                  placeholder="Enter product description..."
                  onChange={(e) => handleAddChange(e.target.value, "item-desc")}
                />
              </div>
              <label htmlFor="item-img">Product Image</label>
              <div>
                <input
                  type="text"
                  id="item-img"
                  value={addItemData.productImg}
                  placeholder="Enter product image-url"
                  onChange={(e) => handleAddChange(e.target.value, "item-img")}
                />
              </div>
              <div className="add-item-form-btn">
                {!showUpdate && (
                  <button
                    className="add-btn-save"
                    onClick={() => handleAddItem()}
                  >
                    Add
                  </button>
                )}
                {showUpdate && (
                  <button
                    className="add-btn-save"
                    onClick={() => saveProductEdit()}
                  >
                    Save Changes
                  </button>
                )}
                <button
                  className="add-btn-cancel"
                  onClick={() => handleModalClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
