import React, {useContext} from 'react';
import {GlobalStore} from "../../components/store/global";
import {Button, Container} from "semantic-ui-react";
import {Head, Section} from "../../components/styled/frameworks";
import GetTheme from "../../components/hooks/GetTheme";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 14:23:47
 */

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
const Theme = (props) => {

  const {dispatch } = useContext(GlobalStore);
  const currentTheme = GetTheme();

  const toggle = theme =>  dispatch({ type: 'theme', payload: theme });

  return <React.Fragment>
    <Head>
      <h3> 主题色 </h3>
    </Head>
  <Section marginRight={false}>

    <Container fluid  style={{padding: "16px 32px"}}>
      <h3> 主题色 </h3>

        {
          themes.map(theme =>
              <Button style={{marginRight:10}}
                     key={theme.color}
                      basic={currentTheme !== theme.color}
                     title={theme.description} color={theme.color}  as="a" onClick={() => toggle(theme.color)}
              >
                {theme.description}
              </Button>)
        }

    </Container>



  </Section>
  </React.Fragment>
}

export default Theme;
