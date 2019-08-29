import React, {} from 'react';
import Header from "./layouts/header"

import Background from './layouts/background'
import BootStrap from "./layouts/bootstrap"
import Footer from "./layouts/footer"
import Utils from "./layouts/utils"

export default function App() {

  return (
    <React.Fragment>
      {/*<Background/>*/}
      <Header/>
      <BootStrap/>
      <Footer/>
      <Utils/>
    </React.Fragment>
  );
}
