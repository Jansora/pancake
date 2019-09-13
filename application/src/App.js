import React from 'react';
import Header from "./layouts/header"

import Background from './layouts/background'
import BootStrap from "./layouts/bootstrap"
import Footer from "./layouts/footer"
import Message from "./components/message";

export default function App() {

  return (
    <React.Fragment>
      <Background/>
      <Header/>
      <BootStrap/>
      <Footer/>
      <Message/>
    </React.Fragment>
  );
}
