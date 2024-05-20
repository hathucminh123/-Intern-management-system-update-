import React from 'react'
import { Input } from 'antd';

import './InputFormComponent.css'
const InputFormComponent = (props) => {

    const {placeholder='Nhập text',...rests}=props
    const handleOnchangeInput= (e)=>{
        props.onChange(e.target.value)
    }
 return (
    // <Input style={{fontSize:'40px',color:'currentcolor',font:'inherit',width:'100%',padding:'16.5px 14px 16.5px 0px', backgroundColor:' rgb(232, 240, 254)'}} placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput}/>
    <Input className='WrapperInputStyle' placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
 )
}

export default InputFormComponent