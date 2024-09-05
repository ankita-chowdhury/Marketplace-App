import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./ApiServices";
import ProductCard from "./ProductCard";

const MyProducts = ({
  userId,
  setModalShow,
  setShowUpdate,
  showAddItem,
  setAddItemData,
  setCurrentEditingProductId,
  fetchMyProducts,
  setFetchMyProducts,
  sortByValue,
  filterSectionItems,
  setCouponCount,
  setSoldCouponCount,
  setActionMsg,
}) => {
  const [myProducts, setMyProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    getMyProductList();
  }, [fetchMyProducts]);
  useEffect(() => {
    sortByItems(sortByValue);
  }, [sortByValue]);
  useEffect(() => {
    applyFilters();
  }, [filterSectionItems]);

  const applyFilters = () => {
    const activeFilters = filterSectionItems
      .filter((item) => item.check)
      .map((item) => item.name);

    filterItems(activeFilters);
  };

  const filterItems = (activeFilters) => {
    let tempProducts = [...myProducts];
    // Apply category filtering
    if (activeFilters.length > 0) {
      tempProducts = tempProducts.filter((item) =>
        activeFilters.includes(item.category)
      );
    }
    setCouponCount(tempProducts.length);
    soldItemsCount(tempProducts);
    setFilterProducts(tempProducts);
  };

  const sortByItems = (inputFieldVal) => {
    const tempProducts = [...filterProducts];
    if (inputFieldVal === "lowToHigh") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (inputFieldVal === "highToLow") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (inputFieldVal === "newFirst") {
      tempProducts.sort((a, b) => {
        const dateA = new Date(
          a.productListingDate.split("-").reverse().join("-")
        );
        const dateB = new Date(
          b.productListingDate.split("-").reverse().join("-")
        );
        return dateB - dateA;
      });
    } else if (inputFieldVal === "oldItems") {
      tempProducts.sort((a, b) => {
        const dateA = new Date(
          a.productListingDate.split("-").reverse().join("-")
        );
        const dateB = new Date(
          b.productListingDate.split("-").reverse().join("-")
        );
        return dateA - dateB;
      });
    }
    setFilterProducts(tempProducts);
  };

  const soldItemsCount = (items) => {
    const tempItems = [...items];
    const soldCount = tempItems.reduce((acc, item) => {
      return item.soldFlag === true ? acc + 1 : acc;
    }, 0);
    setSoldCouponCount(soldCount);
  };
  const getMyProductList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        params: { sellerId: userId },
      });
      setCouponCount(response.data.length);
      soldItemsCount(response.data);
      setMyProducts(response.data);
      setFilterProducts(response.data);
      setFetchMyProducts(false);
      // setFetchAgain(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${productId}`);
      // setFetchAgain(true);
      getMyProductList();
      setActionMsg("Product Deleted Successfully!");
      setTimeout(()=>{
        setActionMsg("");
      },3000)
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditProductClick = (productId) => {
    const productToEdit = filterProducts.find(
      (product) => product.id === productId
    );
    setAddItemData({
      productName: productToEdit.productName,
      price: productToEdit.price,
      category: productToEdit.category,
      productDescription: productToEdit.productDescription,
      productImg: productToEdit.productImg,
    });
    setCurrentEditingProductId(productId);
    setModalShow(true);
    setShowUpdate(true);
  };

  return (
    <>
      {filterProducts.map((item, index) => {
        return (
          <ProductCard
            key={index}
            item={item}
            handleEditProductClick={handleEditProductClick}
            deleteProduct={deleteProduct}
            showAddItem={showAddItem}
          />
        );
      })}
    </>
  );
};

export default MyProducts;
