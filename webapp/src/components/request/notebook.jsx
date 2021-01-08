import {useEffect, useState} from 'react';
import {client} from "./index";
import {message} from "antd";
import {stringify} from 'qs'
import {IsNumber} from "../utils";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/05 14:25:13
 */
export const FetchClassifies = () => {


  const [classifies, setClassifies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading) {
      client.get(`notes/classifies`)
          .then(setClassifies).finally(()=> {  setLoading(false)
      })
    }

  }, [loading]);



  return [classifies, loading];
};


export const FetchLogos = () => {


  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading) {
      client.get(`notes/logos`)
          .then(setLogos).finally(()=> {  setLoading(false)
      })
    }

  }, [loading]);



  return [logos, setLogos, loading];
};

export const FetchClassifyCount = () => {


  const [classifyCounts, setClassifyCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading) {
      client.get(`notes/classifyCounts`)
          .then(setClassifyCounts).finally(()=> {  setLoading(false)
      })
    }

  }, [loading]);



  return [classifyCounts, setClassifyCounts, loading];
};
export const FetchTags = () => {


  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading) {
      client.get(`notes/tags`)
          .then(data => setTags(Object.entries(data).sort((a,b) => b[1] - a[1]).map(tag => tag)))
          .finally(()=> {  setLoading(false)
      })
    }

  }, [loading]);



  return [tags, setTags, loading];
};

export const FetchRelationTags = (classify) => {


  const [relationTags, setRelationTags] = useState([]);
  const [relationTagsLoading, setLoading] = useState(true);
  useEffect(()=> {

      client.get(`notes/tags?${stringify({classify})}`)
          .then(data => setRelationTags(Object.entries(data).sort((a,b) => b[1] - a[1]).map(tag => tag)))
          .finally(()=> {  setLoading(false)
          })


  }, [relationTagsLoading, classify]);



  return [relationTags, relationTagsLoading];
};

export const InsertNote = (data, callback) => {


  client.post('note', data)
      .then(response =>  {
          message.success("添加成功")
          callback && callback(response)

      }).catch( e => {
  }).finally(()=> {
  })


  return null;
};
export const UpdateNote = (data, callback) => {
  client.put('note', data)
      .then(response =>  {
        // message.success("更新成功")
        callback && callback(response)

      }).catch( e => {
  }).finally(()=> {
  })


  return null;
};
export const FetchNote = (id, resource) => {


  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading && !!id  && IsNumber(id)) {

      client.get(`note/${id}`)
          .then(setNote).finally(()=> {  setLoading(false)
      })
    }
    console.log(id)
    if(loading && !!id &&  !IsNumber(id) && id !== "new") {
      client.get(`note/post/${id}`)
          .then(setNote).finally(()=> {  setLoading(false)
      })
    }




  }, [loading, id]);



  return [note, loading];
};

export const ImportNote = (resource, callback) => {


      client.get(`note/importNote/${resource}`)
          .then(callback)

}


export const FetchNotes = (classify, tag, title, offset, orderBy, sort, setOffset) => {

  const [notes, setNotes] = useState([]);
  const [total, setTotal] = useState([]);
  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    setOffset(0)
    setNotes([])
  },[classify, tag, orderBy, sort, setOffset])


  useEffect(()=> {
    setLock(false);
  },[classify, tag, offset, orderBy, sort])

  useEffect(()=> {
    if (!lock) {
      setLock(true);
      setLoading(true)
      const args = {sort, orderBy, tag, limit: 10, offset, title, classify};
      client.get(`notes?${stringify(args)}`).then(response => {
        setTotal(response.total)
        setNotes(notes.concat(response.data));

        message.success( `获取文章列表, 当前已展示 ${notes.concat(response.data).length} / ${response.total} 条`)

      }).finally(() => setLoading(false));
    }
  }, [lock, offset, notes, tag, title, setLock, sort, orderBy, classify]);
  return [notes, setNotes, total, setLock, loading];
};

export const DeleteNote = (id, callback) => {

  client.delete(`note/${id}`)
      .then(response => {
        callback && callback()
      }).catch(e => {
  }).finally(() => {

  })
  return null;
};


export const FetchNotebooks = () => {


  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading) {
      client.get(`notebook`)
           .then(data => setNotebooks(data.sort((a,b) => a.dataIndex - b.dataIndex).map(tag => tag)))
          .finally(()=> {  setLoading(false)
      })
    }

  }, [loading]);



  return [notebooks, loading];
};

export const FetchInnerApps = () => {


  const [innerApps, setInnerApps] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    if(loading) {
      client.get(`innerApp`)
          .then(data => setInnerApps(data.sort((a,b) => a.dataIndex - b.dataIndex).map(tag => tag)))
          .finally(()=> {  setLoading(false)
      })
    }

  }, [loading]);



  return [innerApps, setInnerApps, loading];
};
