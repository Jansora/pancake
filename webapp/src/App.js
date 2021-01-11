import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import styled from "styled-components";
import NavBar from "./layout/navbar";
import Notes from "./layout/notes/index";
import About from "./layout/about";
import Hooks from "./components/hooks";
import {configResponsive} from 'ahooks';
import GetPath from "./components/hooks/GetPath";

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});



const LayoutWrapper = styled.main`
  padding-top: var(--header-height);
  height: 100%;
  margin-left: ${props => props.activeNav ? "var(--active-header-width)" : "var(--header-width)"};
  transition:  margin-left 500ms;

  > header {
    width: calc(100vw - ${props => props.activeNav ? "var(--active-header-width)" : "var(--header-width)"} );
    transition: width 500ms;
  }
`;

const App = () => {
  const [activeNav, setActiveNav] = useState(false);
  const path = GetPath();
  const setActiveNavHandle = (value) => {
    if(path === "/notes/new" || (path.startsWith("/notes") && path.endsWith("edit"))) {
      return
    }
    setActiveNav(value)
  }
  return (
      <React.Fragment>
        <NavBar activeNav={activeNav} setActiveNav={setActiveNavHandle} />
        <LayoutWrapper activeNav={activeNav}>
          <Switch>
            <Redirect from="/" to="/notes" exact={true} />
            <Redirect from="/post/:resource" to="/notes/:resource"/>

            <Route path="/notes" component={Notes} exact={false}/>

            <Route path="/about" component={About} exact={false}/>


          </Switch>
        </LayoutWrapper>
        <Hooks/>
      </React.Fragment>
  );
}

export default App;
