import React, { Component,useState,useEffect } from 'react'
import "./header.css"
import db from '../Firebase/firebase.js'
import AsyncSelect from 'react-select/async'
import ModalShow from "../CardBodys/AddBody"

const Header = (props) => {
    const [mainId, setMainId] = useState(props.mainId)
    const [addNewData, setAddNewData] = useState({})
    const [itemsUpdated,setItemUpdated] = useState(false);
    const [searchItemHandler, setSearchItemHandler] = useState('');
    const [selectedTag, setSelectedTag] = useState([]);

    const [name,setName] = useState('Add');

    const enterButtonHandler = (items) => {
        setMainId(null);
        setAddNewData(items);
        setName('Add');
        setItemUpdated(true);
    }

    useEffect(()=>{
        if(itemsUpdated){
            setItemUpdated(false);
            props.click({
                name: name,
                mainId: mainId,
                addNewData: addNewData,
                id: -1
            });
        }
    },[mainId]);


    const handleSearchItems = e =>{
        setSearchItemHandler(e.target.value);
    }
    
    const handleOnChange = (tags) => {
        setMainId(tags.value);
        setName('Select')
        setItemUpdated(true);
    }

    const loadOptions = async (inputValue) => {
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

    return (
        <div className="header-body-container">
            <div className="left-con">
                <div>
                    <AsyncSelect
                        loadOptions={loadOptions}
                        defaultOptions
                        onChange={handleOnChange}
                    />
                </div>
            </div>
            <ModalShow id={props.id} item={props.item} click={enterButtonHandler}/>
        </div>
    )
}

export default Header;

export class HeaderXX extends Component {

    constructor(prop){
        super(prop);

        this.state={
            mainId:prop.mid,
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
