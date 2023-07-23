import './App.css';
import React, { useEffect, useState } from 'react'
import Card from "./Card" 
import Header from "./Components/Header/Header.js"
import db from './Components/Firebase/firebase.js';
// import { propTypes } from 'react-bootstrap/esm/Image';
// import { unstable_renderSubtreeIntoContainer } from 'react-dom'


const App = props => {
  
  const [currentPropertie,setCurrentPropertie] = useState({
    id:-1,
    name:'',
    desc:''
  });

  //console.log(process.env);

  const [mainId,setMainId] = useState(null);
  const [itemNames,setItemNames] = useState([]);
  const [items,setItems] = useState([]);
  const [itemInfoArray,setItemInfoArray] = useState({});
  const [dbId,setDBID] = useState('AKTrzNiiLy6zoIAChLs4');


  const addUpdateDataHandler = async (prop) => {
    if(prop.name == null && !prop.name) return;

  //Update Current Data
    var process = '';

    if(prop.name === 'Update' && prop.mainId != null){
      const itemId = prop.id;
      const obj = {}

      obj[itemId] = prop.inputNameState
      db.collection('Items').doc(prop.mainId).update(obj)
      process = 'update'
    }
  //Select Exixting Data From Dropdown
    else if(prop.name === "Select" && prop.mainId != null){
      setDBID(prop.mainId);
      var doc = await db.collection('Items').doc(prop.mainId).get();
      var data = doc.data();

      var displayItems = {
        id:doc.id,
        data: data
      }

      //var items = setItemsInfos(data);
      setItemInfoArray({id:doc.id,data: data.Info});
      setItems(displayItems);

      process = 'select';
    }
    else if(prop.name === "Add" && prop.mainId === null){
      db.collection("Items").add(prop.addNewData).then((ret) =>{
        db.doc(ret.path).get().then(doc =>{
          var data = doc.data();
          setItemInfoArray({id:doc.id,data: data.Info});
          setItems({id:doc.id,data: data});
        })



        // db.collection('Items').onSnapshot(snap =>{
        //   snap.docs.map(doc =>{
        //     if(doc.id ===data.id){
        //       var docs =  doc.data();
        //       var {Info,...docs} = docs;
        //       //setItemInfo();
        //       setItems({id:doc.id,data: Object.keys(docs).map(m=> {
        //           if(!isNaN(parseInt(m)))
        //             return [Number(m),docs[m]]
        //           })
        //       });
        //       setItemInfoArray({id:doc.id,data: Info});
        //     }
        //   })
        // })
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

  // const setItemsInfos = (items) =>{

  //   return items.map(doc => {
  //       return {
  //       id: doc.id,
  //       data: Object.keys(items).map(m=>{
  //         if(!isNaN(parseInt(m)))
  //           return [Number(m),items[m]]
  //         })
  //       }
  //   });

  // }

  const editOptionHandler = (e,mid) => {
    const itmeInfo = items;

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
        setMainId(mid)
        // setProperties({
        //         mainId:mid,
        //         id:index,
        //         name:item,
        //         desc:''
        //     })

      :null)
    }
  }

  //Called Once After render Call 
  useEffect(() => {

    db.collection('Items').onSnapshot(snap =>{
      snap.docs.map(doc =>{
        if(doc.id === dbId) {
          var data =  doc.data();
            setItems({
              id:doc.id,
              data: data
            });
            setItemInfoArray({id:doc.id,data: data.Info})
        }
      });

    },[]);

    db.collection('itemNames').onSnapshot(snap =>{
      snap.docs.map(doc =>{
        // this.setState({
        //   itemNames: {id: doc.id,data:Object.values(doc.data())}
        // })
        setItemNames({id: doc.id,data:Object.values(doc.data())});
      })
    })
  },[]);

    return (  
        <div className="outer-container">
          <div className="inner-container">
            <div className="header-container">
              <Header click={addUpdateDataHandler} item={itemNames} mainId={dbId}/>
            </div>
            <div className="card-container">
              <Card itemInfoArray={itemInfoArray} items={items} itemNames={itemNames} currentPropertie={currentPropertie} click={addUpdateDataHandler} currProps={currentPropertie}/> 
            </div>
          </div>
        </div>
    );
}

export default App