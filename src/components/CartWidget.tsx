import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import shoppingCart from '../assets/shopping-cart.png';



interface props{
    productsCount:number

}

export const CartWidget:FunctionComponent<props>= ({productsCount})=>{
    const navigate = useNavigate();

   const navigateToCart = () => {
    navigate('/cart')
  }

  return (
    <button className="container" onClick={navigateToCart}>
    <span className="productsCount">{productsCount}</span>
    <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
  </button>

  )


}