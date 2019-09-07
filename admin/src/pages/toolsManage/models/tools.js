
import {getArticle, getArticleList, getTags,
  InsertArticle ,deleteArticle, UpdateArticle, uploadFile, InsertProject,getProjectArticleList,
  DeleteProject, getProject, UpdateProject, 
} from '@/services/golang';
import {message} from 'antd';

export default {
  namespace: 'Tools',

  state: {
    uploadurl: '还未提交文件',
  },

  effects: {
    
    *addfile({ payload }, { call, put }) {
      const r = yield call(uploadFile, payload);

      if (r.ret){
        yield put({
          type: 'updatefileurl',
          payload:r.res,
        });
        let textArea = document.createElement("textarea");
        textArea.value = r.res;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {

          document.execCommand('copy')
              ? message.success('上传成功, 已拷贝到剪贴板')
              : '上传失败' + r.res;

        } catch (err) {
          console.error('上传成功, 拷贝到剪贴板时执行异常', err);
        }
        document.body.removeChild(textArea);
        // window.open(r.res,'_blank','noopener')
      }
      else {
        message.error(r.res)
      }
    },
    

  },

  reducers: {
    updatefileurl(state, action) {

      return {
        ...state,
        uploadurl: action.payload
      };
    },

  },
};

  
