import React, { Component } from 'react';
import { Input , Icon, Menu, Dropdown, Table,Card, Tag} from 'antd';

import connect from "react-redux/es/connect/connect";

import { Link } from "react-router-dom";

import {client} from './../../components/requests';


class Main extends Component {
  
  
  render() {
    return (
      <React.Fragment>
        <p>wait coding........</p>
      </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
});
export default connect(
  mapStateToProps,
)(Main);