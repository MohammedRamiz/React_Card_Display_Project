import React, { Component } from 'react'
import "./header.css"
import db from '../Firebase/firebase.js'
import AsyncSelect from 'react-select/async'
import ModalShow from "../CardBodys/AddBody"

export default class Header extends Component {

    constructor(prop){
        super(prop);

        this.state={
            mainId:prop.mid,
            // id:prop.setNew.id,
            // inputProNameState:prop.setNew.name,
            // inputNameState:prop.setNew.desc,
            addNewData:{},
            name: 'Add',
            searchItemHandler:'',
            selectedTag: []
        }

    }

    enterButtonHandler = (e) => {

        this.setState({mainId:undefined,addNewData:e,id:-1,name:'Add'},() =>{
            this.props.click(this.state)
        })

        // if(e.target.id >= 0){
        //     this.setState({id:-1,inputProNameState: '',inputNameState:'',name:'Add'})
        //     this.props.click(this.state)
        // }
        // else{

        //     if(this.state.inputNameState !== ''){
        //         this.setState({mainId:undefined,id:-1,name:'Add'},() =>{
        //             this.props.click(this.state)
        //         })
        //     }
        //     else{
        //         alert('At leaste Base Attribute Requre')
        //     }
        // }
    }

    // chnageHandler = (e) => {

    //     if(e.target.className === "properties") {
    //         this.setState({inputProNameState:e.target.value})
    //     }
    //     else {
    //         this.setState({inputNameState:e.target.value})
    //     }
    // }

    searchItemHandler = e =>{
        this.setState({searchItemHandler:e.target.value,name:"Add"})
    }
    
    handleOnChange = (tags) => {
        this.setState({mainId:tags.value,id:-1,inputProNameState: '',inputNameState:'',name:"Add"},()=>{
            this.props.click(this.state,"select")
        })
    }

    loadOptions = async (inputValue) => {
        inputValue = inputValue.charAt(0).toUpperCase().replace(/\Wg/, "");

        return new Promise((resolve => {
                db.collection('Items')
                    .orderBy('1')
                    .startAt(inputValue)
                    .endAt(inputValue + "\uf8ff")
                    .get()
                    .then(docs => {
                        if (!docs.empty) {
                            let recommendedTags = []
                            docs.forEach(doc =>  {
                                const lable = doc.data()["1"] + " - " + doc.data()["2"]
                                const tag = {
                                    value: doc.id,
                                    label: lable    
                                }
                                recommendedTags.push(tag)
                            });
                            return resolve(recommendedTags)
                        } else {
                            return resolve([])
                        }
                    })
            })
        )
    }

    render() {
        //var oldId = this.state.id;
        // var isSame = false;

        // if(typeof this.state.mainId !== 'undefined' && typeof this.props.setNew.mainId !== 'undefined'){
        //         isSame = this.state.mainId !== this.props.setNew.mainId
        // }

        // if(this.props.setNew.id !== -1 && this.props.setNew.id !== oldId && !isSame){
        //     this.setState({
        //         mainId:this.props.setNew.mainId,
        //         id:this.props.setNew.id,
        //         inputProNameState:this.props.setNew.name,
        //         inputNameState:this.props.setNew.desc,
        //         name: 'Update'
        //     });
        // }

        return (
                <div className="header-body-container">
                    <div className="left-con">
                        <div>
                            <AsyncSelect
                                loadOptions={this.loadOptions}
                                defaultOptions
                                onChange={this.handleOnChange}
                            />
                        </div>
                    </div>
                    <ModalShow id={this.state.id} item={this.props.item} click={this.enterButtonHandler}/>
                </div>
        )
    }
}
