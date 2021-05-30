import React, { Component } from 'react'

export default class Specification extends Component {

    constructor(props){
        super(props)
        this.state = {
            editable:false,
            newDesc:{
                id:-1,
                inputNameState:props.description,
                mainId:props.mid
            },
        }
    }

    callOnClickHandler = (event)=> {
        this.setState({
            newDesc:{...this.state.newDesc,inputNameState:this.props.description}
        });

        if(event.target.id === "")
            this.props.click2(event.target.parentElement.id,'click');
        else
            this.props.click2(event.target.id,'click');
    }

    changeValue = (e) => {
        this.setState({
            newDesc:{...this.state.newDesc,
                inputNameState:e.target.value
            }
        })
    }

    keyUpHandler = (e) => {
       if(e.key === 'Enter'){
           var target = ''  
            if(e.target.className !== 'spec')
                 target = e.target.parentElement

        this.setState({
            newDesc:{...this.state.newDesc,
                id:target.id,
                name:"Update"
            }
        },() =>{
            this.props.click(this.state.newDesc)
        })
       }
       else if(e.key === 'Escape'){
            this.props.click2(e.target.id,'esc');
        }
    }

    render() {

        var isEditable = false;
        if(typeof this.props.focus !== 'undefined'){
            if(+this.props.focus.id === this.props.id){
                isEditable = true;
            }
        }

        return (
            <div id={this.props.id} className="spec" onClick={this.callOnClickHandler}>
                    <span className="spe-info-name">{this.props.name}</span>
                    {isEditable ? <input className="spec-info-input" id={this.props.id} onChange={this.changeValue} onKeyUp={this.keyUpHandler} value={this.state.newDesc.inputNameState}/> :
                     <span className="spe-info">{this.props.description}</span>}
            </div>
        )
    }
}
