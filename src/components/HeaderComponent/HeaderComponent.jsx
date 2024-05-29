import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './HeaderComponent.css'

import ButtonComponent from '../ButtonComponent/ButtonComponent'


const HeaderComponent = () => {
  return (
    <div className="flex items-center justify-center bg-sub-header text-neutral-6 h-20">
      <div className="flex w-[1200px] items-center justify-between">
        <a href="/">
          <img
            alt="Intern management"
            className="h-10 w-auto"
            src="/logo-geek-adventure.svg"
          />
        </a>
      </div>
    
      <div className=" hidden md:flex">
        <a href="/guest">
        <ButtonComponent
            size={40}
          
            styleButton={{
              background: 'rgb(255 184 28)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '40px',
              margin: '26px 0 50px',
              cursor:'pointer'
            }}
            textbutton={'tìm cơ hội việc làm'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          />
        </a>
      </div>
   
    </div>
  );
};

export default HeaderComponent;
