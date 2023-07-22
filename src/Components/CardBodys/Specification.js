import React, { useState,useEffect } from 'react'

const Specification = (props) => {

    const [isEditable, setIsEditable] = useState(false);
    const [newDesc, setNewDesc] = useState({
        id:-1,
        inputNameState: props.description,
        mainId:props.mainId
    });
    const[isUpdated,setIsUpdated] = useState(false);

    const callOnClickHandler = (event)=> {
        setNewDesc({...newDesc,inputNameState:props.description})

        if(event.target.id === "")
            props.click2(event.target.parentElement.id*1,'click');
        else
            props.click2(event.target.id*1,'click');
    }

    const changeValue = (e) => {
        setNewDesc({...newDesc, inputNameState:e.target.value});
    }

    const keyUpHandler = (e) => {
       if(e.key === 'Enter'){
            var target = ''  
            if(e.target.className !== 'spec')
                target = e.target.parentElement

            setNewDesc({...newDesc,
                id:target.id,
                name:"Update"
            });

            props.click2(e.target.id * 1,null);

            setIsUpdated(true);
            setIsEditable(false);
       }
       else if(e.key === 'Escape'){
            props.click2(e.target.id * 1,null);
            setIsEditable(false);
        }
    }

    useEffect(()=>{
        if(isUpdated){  
            props.click(newDesc)
        }

        if(props.focus != null && props.focus.id === props.id){
            setIsEditable(true);
        }

        setIsUpdated(false);
    },[newDesc,isEditable])

    return (
        <div id={props.id} className="spec" onClick={callOnClickHandler}>
                <span className="spe-info-name">{props.name}</span>
                {isEditable ? <input className="spec-info-input" id={props.id} onChange={changeValue} onKeyUp={keyUpHandler} value={newDesc.inputNameState}/> :
                    <span className="spe-info">{props.description}</span>}
        </div>
    )
    
}


export default Specification;