import './App.css';
import React, { useEffect, useState } from 'react'
import Card from "./Card" 
import Header from "./Header/Header"
import db from './Firebase/firebase.js';
import { propTypes } from 'react-bootstrap/esm/Image';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';


const App = props => {
  // constructor(prop){
  //   super(prop)

  //   this.state = {
  //     properties: [],
  //     currentPropertie:{
  //       id:-1,
  //       name:'',
  //       desc:''
  //     },
  //     mainId:'',
  //     itemNames:[], 
  //     itemInfo:[],
  //     itemInfoArray:{},
  //     dbId:'AKTrzNiiLy6zoIAChLs4' //Default ID
  //   }
  // }

  const [properties,setProperties] = useState([]);
  const [currentPropertie,setCurrentPropertie] = useState({
    id:-1,
    name:'',
    desc:''
  });
  const [mainId,setMainId] = useState('');
  const [itemNames,setItemNames] = useState([]);
  const [itemInfo,setItemInfo] = useState([]);
  const [itemInfoArray,SetItemInfoArray] = useState({});
  const dbID = 'AKTrzNiiLy6zoIAChLs4';


  const addUpdateDataHandler = (prop,oprationType) => {
  //Update Current Data
  var process = '';
  if(prop.name === 'Update' && typeof(prop.mainId) != 'undefined'){
    const itemId = prop.id;
    const obj = {}

    obj[itemId] = prop.inputNameState
    db.collection('Items').doc(prop.mainId).update(obj)
    process = 'update'
  }
  //Select Exixting Data From Dropdown
  else if(oprationType === "select" && typeof(prop.mainId) != 'undefined'){
    this.setState({
      dbId:prop.mainId,
    })

    db.collection('Items').onSnapshot(snap =>{
      snap.docs.map(doc =>{
        if(doc.id === dbId){
          var docs =  doc.data();
          var {Info,...docs} = docs

          // this.setState({
          //   itemInfo: {id:doc.id,data: Object.keys(docs).map(m=>{
          //     if(!isNaN(parseInt(m)))
          //       return [Number(m),docs[m]]
          //     })},
          //     itemInfoArray:{id:doc.id,data: Info},
          // })

          setItemInfo({id:doc.id,data: Object.keys(docs).map(m=>{
            if(!isNaN(parseInt(m)))
              return [Number(m),docs[m]]
            })
          });

          SetItemInfoArray({id:doc.id,data: Info});
        }
      })
    })
    process = 'select'
  }
  else if(prop.name === "Add" && typeof(prop.mainId) === 'undefined'){
    db.collection("Items").add(prop.addNewData).then((data) =>{
      db.collection('Items').onSnapshot(snap =>{
        snap.docs.map(doc =>{
          if(doc.id ===data.id){
            var docs =  doc.data();
            var {Info,...docs} = docs

            this.setState({
              itemInfo: {id:doc.id,data: Object.keys(docs).map(m=>{
              if(!isNaN(parseInt(m)))
                return [Number(m),docs[m]]
              })},
              itemInfoArray:{id:doc.id,data: Info},
            })


            setItemInfo({id:doc.id,data: Object.keys(docs).map(m=>{
              if(!isNaN(parseInt(m)))
                return [Number(m),docs[m]]
              })});
  
            SetItemInfoArray({id:doc.id,data: Info});
          }
        })
      })
    })
    process='add'
  }
  setCurrentPropertie({
        id:-1,
        name: '',
        desc:'',
        process:process
    });
  }

  const editOptionHandler = (e,mid) => {

    const itmeInfo = itemInfo;

    const itemArray = [];
    if(typeof(itmeInfo.data) !== 'undefined' && itmeInfo.data.length > 0)
      itmeInfo.data.map(m => {itemArray[m[0]] = m[1] })

    if(itmeInfo.data.length > 0 &&  typeof(itemArray[parseInt(e)]) !== 'undefined' ){

      itemArray.map((i,index) => index  === parseInt(e)?(
        this.setState({
          currentPropertie:{
              mainId:mid,
              id:index,
              name:itemNames.data[index],
              desc:i
          }
        })
      ):i)
    }
    else{
      itemNames.data.map((item,index) => index  === parseInt(e)?
      (
        setMainId(mid),
        setProperties({
                mainId:mid,
                id:index,
                name:item,
                desc:''
            })

      ):null)
    }
  }

  //Called Once After render Call 
  useEffect(() => {
    db.collection('Items').onSnapshot(snap =>{
      snap.docs.map(doc =>{
        if(doc.id === dbId){
          var docs =  doc.data();
          var {Info,...docs} = docs
            setItemInfo({id:doc.id,data: Object.keys(docs).map(m=>{
              if(!isNaN(parseInt(m)))
                return [Number(m),docs[m]]
              })});
              setItemInfoArray({id:doc.id,data: Info})
        }
      });
    },[]);

    db.collection('itemNames').onSnapshot(snap =>{
      snap.docs.map(doc =>{
        this.setState({
          itemNames: {id: doc.id,data:Object.values(doc.data())}
        })
      })
    })
  });

    return (  
        <div className="outer-container">
          <div className="inner-container">
            <div className="header-container">
              <Header click={addUpdateDataHandler} item={itemNames} mid={mainId}/>
            </div>
            <div className="card-container">
              <Card satate={state} click={addUpdateDataHandler} setNew={currentPropertie}/> 
            </div>
          </div>
        </div>
    );
}

export default App