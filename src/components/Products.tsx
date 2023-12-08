import { FunctionComponent, useEffect, useState } from "react";
import { CurrencyFormatter } from "./CurrencyFormatter";

import useLocalStorageState from 'use-local-storage-state'
const API_URL = 'https://dummyjson.com/products'


export type Product = {
    id: number
    title: string
    price: number
    thumbnail: string
    image: string
    quantity: number
  }
export interface CartProps {
    [productId: string]: Product
  }
  

  export const Products:FunctionComponent = ()=>{


    const [isLoading,setIsLoading] = useState(true);
    const [products,setProducts]= useState<Product[]>([]);
    const [error, setError] = useState(false);


    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});


    useEffect(()=>{
        fetchData(API_URL)


    })

    async function fetchData(url:string){
        try{
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
                setProducts(data.products)
                setIsLoading(false)
            }else {
                setError(true);
                setIsLoading(false)

            }

        }catch(error){
            setError(true)
            setIsLoading(false)


        }
    }
    const addCart = (product:Product)=>{
        product.quantity = 1

        setCart((prevCart)=>({
            ...prevCart,
            [product.id]:product
        }))


  if (error) {
    return <h3 className="error">An error occurred when fetching data. Please check the API and try again.</h3>
  }

  if (isLoading) {
    return <><h1>Loading....</h1></>
  }

    }
    const isInCart = (productId: number):boolean => Object.keys(cart || {}).includes(productId.toString())



    return (
        <section className="productPage">
          <h1>Products</h1>
    
          <div className="container">
            {products.map(product => (
              <div className="product" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>Price: <CurrencyFormatter amount={product.price} /></p>

                <button disabled={isInCart(product.id)} onClick={() => addCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )





  }