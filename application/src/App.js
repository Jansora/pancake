import React from 'react';
import Header from "./layouts/header"

import Background from './layouts/background'
import BootStrap from "./layouts/bootstrap"
import Footer from "./layouts/footer"
import Message from "./components/message";
import {useMediaQuery} from "react-responsive";
import {desktopStyle} from "./utils/constants";

export default function App() {

  const isDesktop = useMediaQuery({query: desktopStyle});

  return (
    <React.Fragment>
      {isDesktop && <Background/>}
      <Header/>
      <BootStrap/>
      <Footer/>
      <Message/>
    </React.Fragment>
  );
}
