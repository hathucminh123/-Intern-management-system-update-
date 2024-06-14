import React from 'react';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';




const CustomizedContent = ({ data = {}, colors = {} }) => {
  const getIcon = (key) => {
    switch (key) {
      case 'jobs':
        return <UserOutlined />;
      case 'campaign':
        return <AppstoreOutlined />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  const handleNewJobs = (key) => {
    switch (key){
      case 'jobs':
        navigate("/hrmanager/Jobs");
        break;
      case 'campaign':
        navigate("/hrmanager/campaigns");
        break;
      default:
        break;
    }
  };
  
  return (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
       
      {Object.keys(data).map((item) => (
        <div 
          key={item} 
          style={{
            width: 500,
            background: `linear-gradient(${colors[item]?.[0] || '#000'}, ${colors[item]?.[1] || '#fff'})`,
            height: 300,
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            cursor: 'pointer'
            
          }}
          onClick={() => handleNewJobs(item)}
        >
          <span style={{ color: '#fff', fontSize: 30 }}>
            {getIcon(item)}
          </span>
          <span  style={{ color: '#fff', fontSize: 30, fontWeight: 'bold', textTransform: 'uppercase' }}>{item}</span>
          <span style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>{data[item]}</span>
        </div>
      ))}
  
    </div>
  );
};

export default CustomizedContent;
