import { FunctionComponent } from "react";
import { CurrencyFormatter } from "./CurrencyFormatter";
interface Props {
    amount:number
}

export const TotalPrice:FunctionComponent<Props> = ({amount})=>{
    return(
       <div> <CurrencyFormatter amount ={amount}/> </div>

    )

}