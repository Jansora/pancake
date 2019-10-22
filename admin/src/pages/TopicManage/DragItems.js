import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Icon, Input, List, Select, Tooltip } from 'antd';
import { updateSingleArrayItem, updateDoubleArrayItem, deleteSingleArrayItem, deleteDoubleArrayItem} from "@/utils/utils";
import styles from './style.less';

const style = {
  border: '1px solid gray',
  margin: '20px',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const { Option } = Select;

const DragItem = ({ index, moveItem, article, articles, setArticles, collections }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'Article',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'Article', index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref));
  return (
    <div key={index} ref={ref} style={{ ...style, opacity }}>
    <List.Item >
    <Select
      value={article.type}
      style={{ width: 80, marginRight: 30 }}
      optionFilterProp="children"
      onChange={ type => {
        setArticles(articles.map(
          (e, i2) =>
            (i2 === index ? { ...e, type } : e),
        ))
      }}
      filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
    <Option value="menu">菜单</Option>
      <Option value="document">文档</Option>
      </Select>
      {
        article.type === 'menu' &&
        <Input
          value={articles[index].title}
          style={{ width: 400 }}
          onChange={ title => {
            setArticles(articles.map((e, i2) =>
              (i2 === index ? { type: 'menu', title: title.target.value} : e)
            ),)
          }}/>
      }
      {
        article.type === 'document' &&
        <Select
          value={article.id}
          showSearch
          style={{ width: 400 }}
          optionFilterProp="children"
          onChange={ id => setArticles(articles.map((e, i2) => (i2 === index ? {...e, id } : e)))
          }
          filterOption={(input, option) =>
            option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            collections.map(e=>
              <Option value={e.Id} key={e.Id} ><Tooltip title={e.Url}>{e.Title}</Tooltip></Option>
            )
          }
        </Select>
      }

      <Tooltip title={index === 0 ? '已经到顶部了' : '向上移动'}>
        <Icon
          onClick={ () => {
            if (index <= 0) return;
            const cur1 = articles.slice(0, index-1);
            const cur2 = articles.slice(index-1, index);
            const cur3 = articles.slice(index, index+1);
            const cur4 = articles.slice(index+1);
            const cur = cur1.concat(cur3).concat(cur2).concat(cur4);
            setArticles(cur)
          }}
          style={{ cursor: index === 0 ? 'not-allowed' : 'pointer' }}
          className={styles.direction}
          type="arrow-up" />
      </Tooltip>
      <Tooltip title={index === articles.length - 1 ? '已经到底部了' : '向下移动'}>
    <Icon
      onClick={ () => {
        if (index >= articles.length) return;
        const cur1 = articles.slice(0, index);
        const cur2 = articles.slice(index, index+1);
        const cur3 = articles.slice(index+1, index+2);
        const cur4 = articles.slice(index+2);
        const cur = cur1.concat(cur3).concat(cur2).concat(cur4);
        setArticles(cur)
      }}
      style={{ cursor: index === articles.length - 1 ? 'not-allowed' : 'pointer'}}
      className={styles.direction} type="arrow-down" />
        </Tooltip>


      <Tooltip title={'在本节点前新增节点'}>
        <Icon
          style={{marginLeft: 200}}
          onClick={ () => {
            const cur1 = articles.slice(0, index);
            const cur2 = [{title: '默认节点', type: 'menu'}];
            const cur3 = articles.slice(index);
            const cur = cur1.concat(cur2).concat(cur3);
            setArticles(cur)
          }}
          className={styles.direction} type="plus" />
      </Tooltip>
      <Tooltip title={'删除此节点'}>
        <Icon
      onClick={ () => {
        const cur1 = articles.slice(0, index);
        const cur2 = articles.slice(index+1);
        const cur = cur1.concat(cur2);
        setArticles(cur)
      }}
      className={styles.direction} type="minus" />
        </Tooltip>
      {
        article.type === 'document'
        && collections.filter(
          a => a.Id === articles[index].id).length > 0
        &&
        <Tooltip title={'编辑该文档'}>
          <a target="_blank"
             rel="noopener noreferrer"
             href={
               `/ArticleManage/ArticleEdit/${
                 collections.filter(a => a.Id === articles[index].id)[0].Url}`
             }
          >
            <Icon
              className={styles.direction} type="edit" />
          </a>
        </Tooltip>
      }
    </List.Item>
    </div>
  )
}
export default DragItem;
