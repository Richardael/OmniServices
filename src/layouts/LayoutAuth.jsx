import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div className="fondo">
      <div className="bg"></div>
<div className="bg bg2"></div>
<div className="bg bg3"></div>
      <Outlet />
    </div>
  );
};

export default LayoutAuth;
