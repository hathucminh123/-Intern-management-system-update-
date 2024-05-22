import React from 'react';
import { Input } from 'antd';
import './InputFormComponent.css';

const InputFormComponent = (props) => {
  const { placeholder = 'Nhập text', ...rests } = props;

  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <Input 
      className='WrapperInputStyle' 
      placeholder={placeholder} 
      value={props.value} 
      {...rests} 
      onChange={handleOnChangeInput} 
      variant="filled" // Sử dụng variant thay vì bordered
    />
  );
};

export default InputFormComponent;
