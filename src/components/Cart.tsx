
import { FunctionComponent, useEffect } from "react"
import useLocalStorageState from "use-local-storage-state"
import { CartProps } from "./Products";
import { useLocation } from "react-router-dom";
import { Operation, Quantifier } from './Quantifier'
import { TotalPrice } from "./TotalPrice";
import './../cart.css';

export const Cart:FunctionComponent = ()=>{

    const [cart,setCart] = useLocalStorageState<CartProps>('cart',{});
    const location = useLocation();

    useEffect(()=>{
        window.scroll(0,0)
    },[location])


    const handleRemoveProduct = (productId:number)=>{
        setCart((prevCart)=>{
            const updatedCart = {...prevCart}
            delete updatedCart[productId]
            return updatedCart
        })

    }

    const handleUpdateQuantity = (productId:number,operation:Operation)=>{

        setCart((prevCart)=>{
            const updatedCart = {...prevCart}
            if(updatedCart[productId]){
                if(operation === 'increase'){
                    updatedCart[productId]= {...updatedCart[productId],quantity:updatedCart[productId].quantity+1}
                }else {

                    updatedCart[productId]= {...updatedCart[productId],quantity:updatedCart[productId].quantity-1}

                }
            }
            return updatedCart

        })

    }


    const getProducts = () => Object.values(cart|| {})

    const totalPrice = getProducts().reduce((accumulator, product)=>accumulator+(product.price *product.quantity),0)

    return (
        <section className="cart">
            <h1>Cart</h1>
        <div className="container">
            {getProducts().map(product =>(
                <div className="product" key={product.id}>
                    <img  src={product.thumbnail} alt={product.title}/>
                    <h3>{product.title}</h3>
                    <h4>Price @:{product.price}</h4>
                    <Quantifier
                    removeProductCallback={()=>handleRemoveProduct(product.id)}
                    productId={product.id}
                    handleUpdateQuantity={handleUpdateQuantity}
                    
                    />
                </div>
            ) )}

        </div>
       <h3>Total Price = </h3> <TotalPrice amount={totalPrice} />


        </section>
    )





}