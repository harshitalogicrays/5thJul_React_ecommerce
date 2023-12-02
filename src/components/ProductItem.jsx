import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART } from "../redux/Slices/cartSlice";

const ProductItem = ({ product }) => {
  // console.log(product)
  let {id,name,imageURL,price,desc}=product
  const dispatch=useDispatch()   
  let addcart=()=>{
    dispatch(ADD_TO_CART(product))
  } 
  return (
    <>
        <div className="col-4 mt-5">
          <div class="card">     
          <Link to={`/productdetails/${id}`}>   
            <img src={imageURL} class="card-img-top" alt={name} height='200px' />
            </Link>
            <div class="card-body">
              <h5 class="card-title">{name}</h5>
              <p class="card-text">
                {price}
              </p>
              <p class="card-text">
                {desc}
              </p>
              <button class="btn btn-danger" onClick={addcart}>
               Add to cart
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default ProductItem;
