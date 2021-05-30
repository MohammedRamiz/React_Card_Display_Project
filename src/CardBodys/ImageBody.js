import React, { Component } from 'react'
import "./cardbodys.css"
import Specificatin from "./Specification"
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

export default class ImageBody extends Component {


    constructor(prop){
        super(prop)   
        this.state = {
            show:false,
            infoId:'',
            id:"",
            inputNameState:prop.state.inputNameState ,
            focusedItem:{}
        }
    }


    handleSpecification = (prop,type) =>{
        if(type === 'click'){
            this.setState({
                focusedItem:{
                    id:prop,
                }
            })
        }
        else if(type === 'esc'){
            this.setState({
                focusedItem:{}
            })
        }
    }

    handleShow = (id,desc) => {
        this.setState({show:true,infoId:id,focusedItem:{}})
        this.props.click(id,desc)
    }

    render() {

        const itemInfo = this.props.state.itemInfo;
        const itemArray = [];
        
        if(typeof(itemInfo.data) !== 'undefined' && itemInfo.data.length > 0)
             itemInfo.data.map(m => {itemArray[m[0]] = m[1]})

        return (
            <div className="specifications">
                <div className="left" id={itemInfo.id}>
                    {
                        Object.keys(this.props.state.itemNames).length > 0 ? this.props.state.itemNames.data.map((name,index) => {
                            const desc = typeof(itemArray[index]) != 'undefined' && itemArray[index].length > 0 ? itemArray[index] : ''
                            return <Specificatin key={index} id={index} processType={this.props.state.currentPropertie} focus={this.state.focusedItem} mid={itemInfo.id} name={name} 
                                                description={desc} click={this.handleShow} click2={this.handleSpecification}/>
                        }) : null
                    }
                </div>
                <div className="right"></div>
            </div>
        )
    }
}
