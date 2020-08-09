/*
* @file history.jsx
* @author jansora

*/
import React, {useEffect, useState} from 'react';


import {Grid, Label, Menu, Modal, Popup} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";

import {QueryHistory, QueryHistoryList} from "../../request/post";
import DiffEditor from "../editor/code-editor/DiffEditor";
import * as moment from 'moment'
import 'moment/locale/zh-cn'
import {StyledDescription} from "../../styled/GlobalStyles";

moment.locale('zh-CN')
const History = (props) => {


    const { post, raw } = props;

    const theme = GetTheme();

    const {open, setOpen} = props;

    const [historyId, setHistoryId] = useState(null);

    const history = QueryHistory(historyId)
    const historyList = QueryHistoryList(post.id);


    useEffect(()=> {
      if(historyList.length > 0) {
          setHistoryId(historyList[0].id)
      }
    }, [historyList, setHistoryId])


    return (

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{width: "90%", height: "80%"}}
      >
          <Modal.Header>历史文档<StyledDescription>左侧为服务器版本，右侧为本地编辑版本</StyledDescription> </Modal.Header>
        <Modal.Content>
          <Grid columns="equal">
              <Grid.Column width={3}>
                  <Menu vertical secondary size="small"
                        style={{position: "sticky", top: 50, height: "80vh", overflow: "scroll"}}
                  >
                      {
                          historyList.map(item => <Menu.Item
                                  key={item.id}
                                  onClick={() => setHistoryId(item.id)}
                                  active={history.id === item.id}
                              >
                              {
                                  item.version === "NORMAL"
                                      ?  <Label color={theme} size="tiny">正式</Label>
                                      :  <Label size="small">自动保存</Label>
                              }
                              <Popup content={item.updateAt}
                                     trigger={<span>{moment(item.updateAt).fromNow()}</span>} />
                              </Menu.Item>
                          )
                      }
                  </Menu>
              </Grid.Column>
            <Grid.Column >
                {
                        history &&
                        <DiffEditor
                            modified={{data: raw, language: 'markdown'}}
                            original={{data: history.raw, language: 'markdown'}}
                        />
                }

            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>

  )
}
export default History;
