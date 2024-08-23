import React, { useEffect, useState } from 'react'
import Filter from '../assets/images/Filter.png'

const FilterSection = ({filterSectionItems,setFilterSectionItems}) => {
    
    const handleCheck = (index) => {
      setFilterSectionItems((prevItems) =>
          prevItems.map((item, i) =>
            i === index ? { ...item, check: !item.check } : item
          )
        );       
      };
  return (
    <div className="filter-section">
      <div className="filter-heading">
        <span className='filter-img'><img src={Filter} alt="" /></span>
        <p>Filters</p>
      </div>
    {filterSectionItems.map((item, index) => (
      <div className='filter-item' key={index}>
        <input type="checkbox" id={`filter-item-${index}`} className="custom-checkbox" onChange={()=>handleCheck(index)}/>
        <label htmlFor={`filter-item-${index}`}>{item.name}</label>
      </div>
    ))}
  </div>
  )
}

export default FilterSection
