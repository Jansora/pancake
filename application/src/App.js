import React from 'react';
import Header from "./layouts/header"
// import Background from './components/background'
import BootStrap from "./layouts/bootstrap"


export default function App() {
  
  return (
    <React.Fragment>
      {/*<Background/>*/}
      <Header/>
      <BootStrap/>
    </React.Fragment>
  );
}
