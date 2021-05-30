import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AddBody extends Component {

    constructor(props){
        super()
        this.state = {
            show:false,
            addNewData:{
              "0":"???",
              "1":"???",
              "2":"???",
              "3":"???",
              "4":"???",
              "5":"???",
              "6":"???",
              "7":"???",
              "8":"???",
            },
            baeAttr:null,
            error:'Base Attribute Is Requre'
        }
        
    }

    handleClose = () =>{
        this.setState({show:false})
    }

    handleShow = () => {
        this.setState({show:true})
    }

    handleAddData = () =>{

      //this.props.click(this.state.addNewData)

      if(this.state.addNewData["1"] !== '???'){
        this.props.click(this.state.addNewData)
        this.setState({show:false})
      }
      else{
        alert('Base Attribute Is Required')
      }
    }

    handleOnChange = (e) =>{
      e.preventDefault();

      var newData = this.state.addNewData;
      const value = e.target.value;
      newData[e.target.parentElement.id] = value;
      this.setState({
        addNewData: newData
      })
    }

    render() {
        return (
           <div className="right-con">
        <Button className="btn-add enter-btn" onClick={this.handleShow}>
           Add
        </Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            Object.keys(this.props.item).length > 0 ? this.props.item.data.map((name,index) => {
              return(
              <div className="add-spec" key={index} id={index}>
                <span>{name}</span>
                <input type="text" name={name} onChange={this.handleOnChange} className="name"/>
              </div>
              )
            }) : null
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" id="-1" className="save-btn" onClick={this.handleAddData}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
            </div> 
        )
    }
}
