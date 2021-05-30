import React, { Component } from 'react'
import "./card.css"
import ImageBody from "./CardBodys/ImageBody"
import InfoBody from "./CardBodys/InfoBody"

export default class Card extends Component {
    constructor(prop){
        super() 
        this.state={
            id:prop.setNew.id,
            inputProNameState:prop.setNew.name,
            inputNameState:prop.setNew.desc,
            show:false
        }
    }

    render() {

        //var info = this.props.satate.itemInfo.

        return (
            <div className="info-card-body">
                <div className="card-info-body">
                    <InfoBody /> 
                    <ImageBody key={this.state.id} state={this.props.satate} click={this.props.click} />
                    <div className="footer-info">
                        <div className="footer-info-info">Info</div>
                        <div className="footer-info-content">
                            <ul>
                                {
                                    Object.keys(this.props.satate.itemInfoArray).length > 0 &&
                                     typeof this.props.satate.itemInfoArray.data !== 'undefined' ? this.props.satate.itemInfoArray.data.map((item,index)=>{
                                        return <li key={index}>{item}</li> }) : null
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
