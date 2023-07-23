import React, { Component,useState } from 'react'
import "./cardbodys.css"
import Specificatin from "./Specification"
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

const ImageBody = (props) => {
    const [show,setShow] = useState(false);
    const [infoId,setInfoId] = useState('');
    const [id,setId] = useState('');
    const [focusedItem,setFocusedItem] = useState(null);

    const items = props.state.items;
    const itemArray = [];
    
    const handleSpecification = (prop,type) =>{
        setFocusedItem(null);
        if(type === '' || type === null) return;

        if(type === 'click'){
            setFocusedItem({
                id:prop
            })
        }
    }

    const handleShow = (id,desc) => {
        setShow(true);
        setInfoId(id);
        setFocusedItem({});

        //this.setState({show:true,infoId:id,focusedItem:{}})
        props.click(id,desc);
    }

    return (
        <div className="specifications">
            <div className="left" id={items.id}>
                {
                    Object.keys(props.state.itemNames).length > 0 ? props.state.itemNames.data.map((name,index) => {
                        const desc = typeof(items.data[index]) != 'undefined' && items.data[index].length > 0 ? items.data[index] : ''
                        return <Specificatin key={index} id={index} processType={props.state.currentPropertie} focus={focusedItem} mid={items.id} name={name} 
                                            description={desc} click={handleShow} click2={handleSpecification}/>
                    }) : <span  className="padding-bottom">Loading Content...</span>
                }
            </div>
            <div></div>
        </div>
    )
}

export default ImageBody