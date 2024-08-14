import React from 'react';
import logoo from '../asset/logo.png'
const Logo = ({ w, h }) => {
  return (
    <img
      src={logoo} // Adjust this path if your logo is not in the public folder
      alt="Logo"
      width={w}
      height={h}
      style={{ display: 'block' }}
    />
  );
};

export default Logo;
