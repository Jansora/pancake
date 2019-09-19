import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {ContentWrapper, FilterWrapper, Loading, MenuWrapper, PostsWrapper} from "../../styles/posts";

import Chip from '@material-ui/core/Chip';
import {Link, withRouter} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';

import {Icon} from "react-fa";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



import {client, format} from "../../utils/requests";
import Tooltip from "@material-ui/core/Tooltip";

import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import {Store} from "../../utils/store";
import {classes} from "../../utils/constants";


const PS = () => {

    const {dispatch, } = React.useContext(Store);


    const limit = 10;

    const [loading, setLoading] = React.useState(false);
    const [sortType, setSortType] = React.useState('create_time');
    const [sort, setSort] = React.useState('desc');
    const [tags, setTags] = React.useState(['所有']);
    const [totalTags, setTotalTags] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(undefined);
    const [title, setTitle] = React.useState('');
    const [offset, setOffset] = React.useState(0);


    const fetch =  React.useCallback((init=true, offset=0) => {

        setLoading(true);

        const args = {sort, sortType,
            tag: tags,
            limit, offset,
            AmbiguousTitle:title};

            client.get("Article?" + format(args)).then((e)=>{
                    if(e.data.ret){
                        setData(data => init ? e.data.res : data.concat(e.data.res));
                        setTotal(e.data.total)
                    }
                }
            ).catch( e => {
                console.error(e);

            }).finally(() => setLoading(false))

    }, [sortType, sort, title, tags]);

    useEffect(()=>{
      const scroll =() => {

        const progress = (window.scrollY + 1) / (document.body.scrollHeight - document.body.clientHeight + 1) * 100;
    
        if(progress > 70 && !loading && data.length < total) {
          setLoading(true);
          fetch(false, offset);
        }
      
      };
        document.addEventListener('scroll', scroll);
        return () => document.removeEventListener('scroll', scroll);
    }, );

    useEffect(() => {
        fetch()
    }, [sort, sortType, tags, title, fetch]);

    //
    useEffect(() => {
        setOffset(data.length);
        if(total){
            dispatch({
                type: 'message',
                payload: {open: true, variant: 'success', content: `已展示 ${data.length} / ${total} 条`, duration: 500}
            })
        }

     }, [data, data.length, total, dispatch]);

    useEffect(() => {
        dispatch({type: 'breadcrumb', payload: [{label: '/posts', value: '博客'}]})
    }, [dispatch]);



    useEffect(()=>{
        const fetchTags = () => {

            client.get("Tags").then((e)=>{
                    if(e.data.ret){
                        const tags = {};
                        e.data.res.forEach(item => {
                            item.forEach(tag => {
                                if(tags.hasOwnProperty(tag)){
                                    tags[tag] += 1
                                } else {
                                    tags[tag] = 1
                                }
                            })
                        });
                        const sortable = Object.keys(tags).map( tag => [tag, tags[tag]]);
                        sortable.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        const result = {};
                        sortable.forEach((item) => result[item[0]] = item[1]);
                        setTotalTags(result)

                    }
                }
            ).catch( e => {
                console.error(e)
            })
        }
        fetchTags()
    }, [])
    return (
          <PostsWrapper>
            <Grid container justify={'space-around'} component='div' spacing={3}>
              <Grid component='div' item xs={3}>
                <FilterWrapper>

                  <p>模糊搜索</p>
                  <div>
                      <TextField
                          variant="outlined"
                          required
                          error={title.length > 10 }
                          label="标题"
                          id="margin-dense"
                          style={{width: 200,  margin: '10px auto'}}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </div>
                  <Divider style={{margin: '10px 20px 3px 20px'}}/>
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
                    <p>标签过滤</p>
                    <div className='tags'>
                        {
                            Object.keys(totalTags).map(tag => classes.indexOf(tag) === -1 &&
                                <Tooltip title={`共有 ${totalTags[tag]} 条`} key={tag}>
                                    <Chip
                                        variant="outlined"
                                        component='span'
                                        label={tag}
                                        onClick={() => setTags([tag])}
                                        className={tags.indexOf(tag) >= 0 ? 'active' : ''}
                                    />
                                </Tooltip>
                    )

                        }
                    </div>
                  {/*<Divider style={{margin: '10px 20px'}}/>*/}
                </FilterWrapper>
              </Grid>
              <Grid component='div' item xs={9}>

                <>
                  <MenuWrapper>
                      {

                          classes.map(tag =>
                              <Tooltip title={`共有 ${totalTags[tag] ? totalTags[tag] : 0} 条`} key={tag}>
                                  <Chip
                                      variant="outlined"
                                      component='span'
                                      label={tag}
                                      onClick={() => setTags([tag])}
                                      className={tags.indexOf(tag) >= 0 ? 'active' : ''}
                                  />
                              </Tooltip>
                             )
                      }

                  </MenuWrapper>
                  <Divider style={{}}/>
                  {/*<Divider style={{margin: '10px 0'}}/>*/}
                    <ContentWrapper>
                      {
                          loading && <Loading><CircularProgress  /></Loading>
                      }
                    {
                        data.map((e, index) =>
                            <Card className='card' key={e.Url}>
                        <div className='detail'>
                            <CardContent >
                                <Link  to={'/post/' + e.Url} className='title'>{e.Title}</Link>
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
                            {/*<div className={classes.controls}>*/}
                            {/*</div>*/}
                        </div>
                        <CardMedia
                            className='bootstrap-logo'
                            image={e.Logo_url.endsWith('.gif')? e.Logo_url :`${e.Logo_url}?x-oss-process=style/posts`}
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


export default withRouter(PS);
