/*
* @file theme.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-17 11:36
*/
import React, {useContext} from 'react';
import {Dropdown, Icon} from "semantic-ui-react";
import {GlobalStore} from "../../store/global";

const Theme = () => {

  const { dispatch } = useContext(GlobalStore);
  const toggle = theme =>  dispatch({ type: 'theme', payload: theme });

  const themes = [
    {color:'red', description:'Red'},
    {color:'orange', description:'orange'},
    {color:'yellow', description:'Yellow'},
    {color:'olive', description:'Olive'},
    {color:'green', description:'Green'},
    {color:'blue', description:'Blue'},
    {color:'violet', description:'Violet'},
    {color:'purple', description:'Purple'},
    {color:'pink', description:'Pink'},
    {color:'brown', description:'Brown'},
    {color:'grey', description:'Grey'},
  ]

  return (
    <Dropdown
      trigger={
        <Icon
          name='gem'
          title='主题'
          style={{margin: 0}}
        />
      }
      icon={null}
      pointing='top right'
    >
      <Dropdown.Menu>
        {
          themes.map(_theme => <Dropdown.Item
              key={_theme.color}
              text={_theme.description}
              onMouseEnter={() => toggle(_theme.color)}
              label={ { color: _theme.color, empty: true, circular: true }}
            />
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default Theme;
