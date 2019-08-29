import React, {} from 'react';
import {FooterWrapper} from "../styles";
import Message from "../components/message";
import {PostsWrapper} from "../styles/posts";
import connect from "react-redux/es/connect/connect";


const Utils = (props) => {
  
    const {show, type, content} = props.message;

    return (
      <React.Fragment>
        <Message
          open={show}
          variant={type}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span >{content}</span>}
        />
      </React.Fragment>
    );
  
}

const mapStateToProps = state => ({
  message: state.message
});
export default connect(
  mapStateToProps,
)(Utils);
