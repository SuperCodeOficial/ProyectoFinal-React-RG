import React from 'react';

function Footer() {
  return (
    <div className="container mt-5">
      <div className="row gap-4 gap-md-0">
        <div className="col-md-3 d-flex justify-content-center align-items-center justify-content-lg-between">
          <img
            src="../public/img/dev.png"
            alt="Descripción de la imagen"
            className="w-8 h-8 inline-block mr-2"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center text-center px-5 justify-content-center">
          Copyright (c) 2024 Maximino Rentería Moreno. All rights reserved.
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center ">
          <img
            src="../public/img/react.png"
            alt="Descripción de la imagen"
            className="w-8 h-8 inline-block mr-2"
          />
          <img
            src="../public/img/bootstrap5.png"
            alt="Descripción de la imagen"
            className="w-8 h-8 inline-block mr-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
