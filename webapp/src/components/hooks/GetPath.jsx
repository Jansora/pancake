import {useLocation} from "react-router-dom";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 11:49:14
 */
const GetPath = (props) => {
  const location = useLocation();
  const {pathname} = location;
  return pathname;
}

export default GetPath;
