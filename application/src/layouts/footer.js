import React, { Component } from 'react';
import {Divider } from 'antd';
import './assets/footer.less';


class Footer extends Component {
  
  render() {
    return (
      <React.Fragment>
        <footer>
          {/*<a href="/">帮助中心</a>*/}
          {/*<Divider type="vertical"/>*/}
          {/*<a href="/">反馈</a>*/}
          {/*<Divider type="vertical"/>*/}
          {/*<a href="/">关于我们</a>*/}
          {/*<Divider type="vertical"/>*/}
          {/*<a href="/">服务协议</a>*/}
          {/*<Divider type="vertical"/>*/}
          <a href="http://www.beian.miit.gov.cn">豫ICP备19010665号</a>
      
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;