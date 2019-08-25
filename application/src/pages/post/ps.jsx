import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {PostsWrapper, MenuWrapper, FilterWrapper, ContentWrapper, Loading} from "../../styles/posts";
import connect from "react-redux/es/connect/connect";
import Chip from '@material-ui/core/Chip';
import { Link, withRouter} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Avatar from '@material-ui/core/Avatar';

import {Icon} from "react-fa";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {classes} from "../../utils/Router";

import {client, format} from "../../utils/requests";
import Tooltip from "@material-ui/core/Tooltip";
import Message from "../../components/message"

const PS = (props) => {
    const dispatch = (type, payload) => props.dispatch({type, payload});
    const {breadcrumb, location} = props;
    dispatch('breadcrumb', breadcrumb);
    const class_ = breadcrumb[breadcrumb.length -1].value;
    const prefix = props.match.path;



    const [loading, setLoading] = React.useState(false);
    const [sortType, setSortType] = React.useState('title');
    const [sort, setSort] = React.useState('desc');
    const [offset, setOffset] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [message, setMessage] = React.useState([false, 'warning', '']);
    function fetch(init=true) {
        setLoading(true);
        if(init) setData([])
        const args = {sort, sortType, tag: class_ ==='所有' ? '' : class_, limit:10, offset : init ? 0 : offset};

        client.get("Article?" + format(args)).then((e)=>{
                if(e.data.ret){

                    console.log(e.data.res, data,data.concat(e.data.res))
                    console.log(init ? e.data.res : data.concat(e.data.res))
                    setData(init ? e.data.res : data.concat(e.data.res));
                    setTotal(e.data.total)
                    setOffset(data.length + 10)

                 }
                setLoading(false);
                // setMessage([true,  'success', `共查询到 ${e.data.total} 条结果.`]) || setTimeout(()=> setMessage([false, 'success', ' ']), 1111000);
            }
        ).catch( e => {
            console.error(e);
            setLoading(false);
        })
    }
    const scroll = () =>{
        const progress = (window.scrollY + 1) / (document.body.scrollHeight - document.body.clientHeight + 1) * 100;
        // console.log(progress)
        if(progress > 90 && !loading && data.length < total) fetch(false);
    }
    useEffect(()=>{

        document.addEventListener('scroll', scroll);
        return () => document.removeEventListener('scroll', scroll);
    }, [scroll])

    useEffect(()=>{
        fetch()
    }, [sort, sortType, class_]);
    return (
          <PostsWrapper>
            <Grid container justify={'space-around'} component='div' spacing={3}>
              <Grid component='div' item xs={3}>
                <FilterWrapper>
                  <p>排序字段</p>
                  <div>
                    <Chip
                          variant="outlined" component='button' label='博客标题' className={sortType === 'title' ? 'active' : '' }
                          onClick={() => setSortType('title')}
                    />
                  </div>
                  <div>
                    <Chip variant="outlined" component='button' label='点赞数' className={sortType === 'like_num' ? 'active' : '' }
                          onClick={() => setSortType('like_num')}
                    />
                    <Chip variant="outlined" component='button' label='阅读量' className={sortType === 'read_num' ? 'active' : '' }
                          onClick={() => setSortType('read_num')}
                    />
                    <Chip variant="outlined" component='button' label='发表时间' className={sortType === 'create_time' ? 'active' : '' }
                          onClick={() => setSortType('create_time')}/>
                    <Chip variant="outlined" component='button' label='更新时间'  className={sortType === 'modify_time' ? 'active' : '' }
                          onClick={() => setSortType('modify_time')}/>
                  </div>

                  <Divider style={{margin: '10px 20px 3px 20px'}}/>
                  <p>排序属性</p>
                  <div>
                    <Chip variant="outlined" component='button' label='从大到小' className={sort === 'desc' ? 'active' : '' }
                          onClick={() => setSort('desc')}
                    />
                    <Chip variant="outlined" component='button' label='从小到大' className={sort === 'asc' ? 'active' : '' }
                          onClick={() => setSort( 'asc')}
                    />

                  </div>

                  {/*<Divider style={{margin: '10px 20px'}}/>*/}
                </FilterWrapper>
              </Grid>
              <Grid component='div' item xs={9}>

                <ContentWrapper>
                  <MenuWrapper>
                    {
                      classes.map(_class => <Chip
                          key={_class.label}
                          variant="outlined"
                          component={Link}
                          label={_class.value}
                          to={ _class.label}
                          className={location.pathname === _class.label ? 'active' : '' }
                      />)
                    }
                  </MenuWrapper>
                  <Divider style={{}}/>
                  {/*<Divider style={{margin: '10px 0'}}/>*/}
                    <ContentWrapper >
                        {
                            // loading && <Loading><CircularProgress className={classes.progress} color="secondary" /></Loading>
                        }
                    {
                        data.map((e, index) =><Card className='card' key={e.Url}

                        >
                        <div className='detail'>
                            <CardContent >
                                <Link  to={prefix + '/' + e.Url} className='title'>{e.Title}</Link>
                                {/*<Typography variant="subtitle1" color="textSecondary">*/}
                                {/*    <Link  to={"/post/" + e.Url} className='author'>{e.Author}</Link>*/}
                                {/*</Typography>*/}

                                <Tooltip title={`${e.Summary}`}>
                                    <p className='summary'>
                                        {e.Summary}
                                    </p>
                                </Tooltip>
                                <div className='bottom'>
                                    <Tooltip title="个人主页 https://zhangyangyuan.com">
                                        <a target='_blank' rel='noopener noreferrer' href='https://zhangyangyuan.com'>
                                            <Icon name='user'/> {e.Author}
                                        </a>
                                    </Tooltip>
                                    <Divider orientation='vertical' style={{margin: '0 20px'}}/>
                                    <Tooltip title={`首次创作于: ${e.Create_time.split('T')[0]}, 最近更新: ${e.Modify_time.split('T')[0]}`}>
                                        <span>
                                            <Icon name='clock-o'/> {e.Create_time.split('T')[0]}
                                        </span>
                                    </Tooltip>
                                    <Divider orientation='vertical' style={{margin: '0 20px'}}/>
                                    <Tooltip title={`创作地点: ${e.Site}`}>
                                        <span>
                                            <Icon name='paper-plane'/> {e.Site}
                                        </span>
                                    </Tooltip>
                                    <Divider orientation='vertical' style={{margin: '0 20px'}}/>
                                    <Tooltip title={`阅读量 ${e.Read_num}`}>
                                        <span>
                                            <Icon name='fire'/> {e.Read_num}
                                        </span>
                                    </Tooltip>
                                    <Divider orientation='vertical' style={{margin: '0 20px'}}/>
                                    <Tooltip title={`点赞数 ${e.Like_num}`}>
                                        <span>
                                            <Icon name='fire'/> {e.Like_num}
                                        </span>
                                    </Tooltip>
                                </div>

                                {/*<Divider style={{margin: '0'}}/>*/}
                            </CardContent>
                            <div className={classes.controls}>
                            </div>
                        </div>
                        <CardMedia
                            className='bootstrap-logo'
                            image={e.Logo_url}
                            title="Live from space album cover"
                        />

                    </Card>)
                    }
                </ContentWrapper>
                </ContentWrapper>

              </Grid>
            </Grid>

              <Message
                  open={message[0]}
                  autoHideDuration={1000}
                  variant={message[1]}
                  ContentProps={{
                      'aria-describedby': 'message-id',
                  }}
                  message={<span >{message[2]}</span>}
              />
          </PostsWrapper>
      )

}

const mapStateToProps = state => ({
  // breadcrumb: state.breadcrumb
});
export default connect(
  mapStateToProps,
)(withRouter(PS));
