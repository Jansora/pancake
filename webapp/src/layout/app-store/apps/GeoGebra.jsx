import React from 'react';
import IFrameWrapper from "../../../components/view/IFrameWrapper";
import {useTitle} from "ahooks";
import {Head} from "../../../components/styled/frameworks";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/27 16:46:06
 */
const GeoGebra = (props) => {
  useTitle("GeoGebra")
  return <>
    <Head >
      <h3>GeoGebra</h3>
    </Head>
    <IFrameWrapper
      loading={false}
      src={"https://www.geogebra.org/graphing"}
  /></>;
}

export default GeoGebra;
