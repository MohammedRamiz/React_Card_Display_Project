import React, { Component, useState } from 'react'
import "./card.css"
import ImageBody from "./Components/CardBodys/ImageBody"
import InfoBody from "./Components/CardBodys/InfoBody"

const Card = props => {
    const [id,setId] = useState(props.currProps.id);
    const [inputProNameState,setInputProNameState] = useState(props.currProps.name);
    const [inputNameState,setInputNameState] = useState(props.currProps.desc);

    return (
        <div className="info-card-body">
            <div className="card-info-body">
                <InfoBody /> 
                <ImageBody key={id} state={props} click={props.click} />
                <div className="footer-info">
                    <div className="footer-info-info">Info</div>
                    <div className="footer-info-content">
                        <ul>
                            {
                                Object.keys(props.itemInfoArray).length > 0 &&
                                    props.itemInfoArray.data ? props.itemInfoArray.data.map((item,index)=>{
                                    return <li key={index}>{item}</li> }) : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
