/*
* @file search.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-17 11:36
*/
import React, {useState} from 'react';
import {Icon} from "semantic-ui-react";
import LoginStatus from "../../../components/hooks/LoginStatus";

const Search = () => {

  const [openSearch, setOpenSearch] = useState(true);
  const loginStatus = LoginStatus();

  if(!loginStatus) return null;
  return (
    <React.Fragment>
        <Icon
            title='新建'
            name='search'
            style={{margin: 0}}
        />
      {/*<Dropdown*/}
      {/*  trigger={*/}
      {/*    <Icon*/}
      {/*      title='新建'*/}
      {/*      name='search'*/}
      {/*      style={{margin: 0}}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  icon={null}*/}
      {/*  pointing='top right'*/}
      {/*>*/}
      {/*  <Dropdown.Menu>*/}

      {/*    <Dropdown.Item onClick={() => setOpenSearch(true)} icon='file' text='新建文档' />*/}
      {/*  </Dropdown.Menu>*/}
      {/*</Dropdown>*/}

      {/*{openSearch && <SearchPane open={openSearch} setOpen={setOpenSearch} />}*/}

    </React.Fragment>
  )
}
export default Search;
