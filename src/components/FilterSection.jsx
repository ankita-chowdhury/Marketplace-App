import React, { useEffect, useState } from 'react'

const FilterSection = ({filteredProducts,setFilteredProducts}) => {
    
    const[filterItems,setFilterItems]=useState([
        {name:"Electronics",check:false},
        {name:"Clothes",check:false},
        {name:"Audio Product",check:false},
        {name:"Gaming Product",check:false},
        {name:"Home Decor & Lights",check:false},
        {name:"Household Appliances",check:false},
        {name:"Smartphone",check:false}
    ]);
    useEffect(()=>{

    },[filteredProducts])
    const handleCheck = (index) => {
        setFilterItems((prevItems) =>
          prevItems.map((item, i) =>
            i === index ? { ...item, check: !item.check } : item
          )
        ); 
        console.log("filtered product",filteredProducts.category);      
      };
  return (
    <div className="filter-section">
    {filterItems.map((item, index) => (
      <div className='filter-item' key={index}>
        <input type="checkbox" id={`filter-item-${index}`} className="custom-checkbox" onChange={()=>handleCheck(index)}/>
        <label htmlFor={`filter-item-${index}`}>{item.name}</label>
      </div>
    ))}
  </div>
  )
}

export default FilterSection
