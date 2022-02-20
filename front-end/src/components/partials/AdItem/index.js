import React from "react";
import { Link } from "react-router-dom"
import { Item } from "./styled";

const AdItem = ({ad}) => {

    const priceRender = (price) => {
        let priceForm = price.toLocaleString('pt-Br', {minimumFractionDigits: 2})
        return priceForm
    }

    return(
        <Item className="adItem">
            <Link to={`/ads/${ad.id}`}>
                <div className="item--Image">
                    <img src={ad.image} alt=''/>
                </div>
                <div className="item--Title">{ad.title}</div>
                <div className="item--price">R$ {priceRender(Number (ad.price))} </div>
            </Link>
        </Item>
        
    )
}

export default AdItem;