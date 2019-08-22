import React, { Component } from 'react';
import {Loader} from 'semantic-ui-react';
import connect from "react-redux/es/connect/connect";
import { css } from '@emotion/core';
import {BarLoader, PropagateLoader} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    width: 1px;
    z-index: 1002;
`;
class Loading extends Component {
  
  render() {
    const {loading} = this.props;
    return (
      <React.Fragment>
        {
          // loading.loading &&
          //   <div style={{position:'fixed', width:'100vw', height:'100vh', top: 0, left: 0,  background:'none'}}>
          //     <div style={{position:'fixed', width:'100vw', height:'100vh', top:'48vh', left: 0,}}>
          //       <PropagateLoader
          //         css={override}
          //         sizeUnit={"px"}
          //         size={24}
          //         // width={6}
          //         // widthUnit={'px'}
          //         // height={135}
          //         // heightUnit={'px'}
          //         // margin={'0 10px'}
          //
          //         color={'var(--primary-active-color)'}
          //         loading//={app.loading}
          //       />
          //
          //     </div>
          //   </div>
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