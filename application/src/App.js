import React, {useEffect} from 'react';
import Header from "./layouts/header"

// import Background from './components/background'
import BootStrap from "./layouts/bootstrap"


export default function App() {
    useEffect(()=>{
        const scroll = () =>{
            // const progress = (window.scrollY + 1) / (document.body.scrollHeight - document.body.clientHeight + 1) * 100;
            console.log('aaaaa')
            // if(progress > 90 && !loading) fetch(false);
        }
        window.addEventListener('scroll', scroll);
        return () => window.removeEventListener('scroll', scroll)
    }, [])
  return (
    <React.Fragment>
      {/*<Background/>*/}
      <Header/>
      <BootStrap/>
    </React.Fragment>
  );
}
