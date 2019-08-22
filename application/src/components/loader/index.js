import React, { Component } from 'react';
import {Loader} from 'semantic-ui-react';
import connect from "react-redux/es/connect/connect";
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;
class Loading extends Component {
  
  render() {
    const {loading} = this.props;
    return (
      <React.Fragment>
        {
          loading.loading &&
          <div style={{position:'fixed', width:'100vw', height:'100vh', top:'48vh', left: 0, zIndex: 1002}}>
            <PacmanLoader
              css={override}
              sizeUnit={"px"}
              size={24}
              color={'var(--primary-active-color)'}
              loading={loading.loading}
            />
          </div>
        }

        {/*<Loader active={loading.loading} color='vio let'>{loading.loadingText}</Loader>*/}
      </React.Fragment>
    
    );
  }
}
const mapStateToProps = state => ({
  loading: state.loading,
});
export default connect(
  mapStateToProps,
)(Loading);