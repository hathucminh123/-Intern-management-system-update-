import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './HeaderComponent.css';
import image1 from '../../../assets/download.png';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';

const menu = (
  <Menu>
    <Menu.Item key="1">
      <a href="/guest">Tìm cơ hội việc làm</a>
    </Menu.Item>
  </Menu>
);

const HeaderComponent = () => {
  return (
    <div className="flex items-center justify-center bg-sub-header text-neutral-6 h-20 px-4">
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        {/* <a href="/guest">
          <img alt="Intern management" className="h-10 w-auto" src={image1} />
        </a> */}
        {/* <div className="hidden md:flex">
          <a href="/guest">
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255 184 28)',
                height: '48px',
                width: 'auto',
                border: 'none',
                borderRadius: '40px',
                cursor: 'pointer',
              }}
              textbutton={'Tìm cơ hội việc làm'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </a>
        </div> */}
        <div className="md:hidden">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
