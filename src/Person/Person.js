import React, { Component } from 'react'

const Person = (props) => {
    return ( 
        <div>
            <p>My Name Is {props.name}</p>
            <p>And I am Programmer</p>
        </div>
    )
}

export default Person