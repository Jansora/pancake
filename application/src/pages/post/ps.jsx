import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {ContentWrapper, FilterWrapper, Loading, MenuWrapper, PostsWrapper} from "../../styles/posts";
import connect from "react-redux/es/connect/connect";
import Chip from '@material-ui/core/Chip';
import {Link, withRouter} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';

import {Icon} from "react-fa";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import {classes} from "../../utils/Router";

import {client, format} from "../../utils/requests";
import Tooltip from "@material-ui/core/Tooltip";

import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";


const PS = (props) => {
    const dispatch = (type, payload) => props.dispatch({type, payload});
    const {location} = props;
    const breadcrumb = props.breadcrumb;//.concat(classes.filter(e => e.label === location.pathname));
    dispatch('breadcrumb', breadcrumb);

    const prefix = breadcrumb[breadcrumb.length - 1].label;
    const class_ = breadcrumb[breadcrumb.length - 1].value;


    const [loading, setLoading] = React.useState(false);
    const [sortType, setSortType] = React.useState('create_time');
    const [sort, setSort] = React.useState('desc');
    const [offset, setOffset] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [title, setTitle] = React.useState('');


    // const [scrolling, setScrolling] = React.useState(false);
    const fetch =  React.useCallback((init=true) => {


        setLoading(true);
        console.log("title", title)
        if(init) setData([]);
        const args = {sort, sortType,
            tag: class_ ==='所有' ? '' : class_,
            limit:10, offset : init ? 0 : offset,
            AmbiguousTitle:title};

            client.get("Article?" + format(args)).then((e)=>{
                    if(e.data.ret){
                        const curData = init ? e.data.res : data.concat(e.data.res)
                        setData(curData);
                        setTotal(e.data.total)
                        setOffset(curData.length)

                        dispatch('message', {show: true, type: 'success', content: `已展示
                      ${curData.length} / ${e.data.total} 条`});

                        setTimeout(()=> dispatch('message', {show: false, type: 'success', content: `已展示
                      ${curData.length} / ${e.data.total} 条`}), 1000);
                    }

                }
            ).catch( e => {
                console.error(e);

            }).finally(() => setLoading(false))



    }, [sortType, class_, offset, sort, title])

    useEffect(()=>{
      const scroll =() =>{
        const progress = (window.scrollY + 1) / (document.body.scrollHeight - document.body.clientHeight + 1) * 100;
    
        if(progress > 92 && !loading && data.length < total) {
          setLoading(true)
          fetch(false);
        }
      
      }
        document.addEventListener('scroll', scroll);
        return () => document.removeEventListener('scroll', scroll);
    }, )

    useEffect(()=>{
        fetch()
    }, [sort, sortType, class_, title]);
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

                    <Divider style={{margin: '10px 20px 3px 20px'}}/>
                    <p>模糊搜索</p>
                    <div>
                        <TextField
                            required
                            error={title.length > 10 }
                            label="标题"
                            id="margin-dense"
                            style={{width: 200,  margin: '10px auto'}}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                  {/*<Divider style={{margin: '10px 20px'}}/>*/}
                </FilterWrapper>
              </Grid>
              <Grid component='div' item xs={9}>

                <>
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
                    <ContentWrapper>
                      {
                          loading && <Loading><CircularProgress  /></Loading>
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
                </>

              </Grid>
            </Grid>

          </PostsWrapper>
      )

}

const mapStateToProps = state => ({
  // breadcrumb: state.breadcrumb
});
export default connect(
  mapStateToProps,
)(withRouter(PS));
