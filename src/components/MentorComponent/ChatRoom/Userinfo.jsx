import React from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
// import img1 from '../../../assets/minhwap.jpg'

// import { auth } from '../../firebase/config';
// import { AuthContext } from '../../Context/AuthProvider';
// import { AppContext } from '../../Context/AppProvider';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(230, 230, 230);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function Userinfo() {
//   const {
//     user: { displayName, photoURL },
//   } = React.useContext(AuthContext);
//   const { clearState } = React.useContext(AppContext);

  return (
    <WrapperStyled>
      <div>
        <Avatar>
          {/* {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()} */}
          {/* {img1} */}
        </Avatar>
        {/* <Typography.Text className='username'>{displayName}</Typography.Text> */}
        <Typography.Text className='username'>Thuc Minh</Typography.Text>
      </div>
      {/* <Button
        ghost
        onClick={() => {
          // clear state in App Provider when logout
          clearState();
          auth.signOut();
        }}
      >
        Đăng xuất
      </Button> */}
    </WrapperStyled>
  );
}