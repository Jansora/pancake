import {Editor as ByteEditor, Viewer as ByteViewer} from '@bytemd/react';
import {message} from "antd";
import gfm from '@bytemd/plugin-gfm';
import highlight from "@bytemd/plugin-highlight"
import image from "@bytemd/plugin-import-image"
import math from "@bytemd/plugin-math"
import zoom from "@bytemd/plugin-medium-zoom"
import mermaid from "@bytemd/plugin-mermaid"
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css';
import './override.css'
import {UploadFile} from "../../request/utils";
import copy from 'copy-to-clipboard';

// import frontmatter from "@bytemd/plugin-frontmatter"
// import gemoji from    "@bytemd/plugin-gemoji"
// import vega from    "@bytemd/plugin-vega"
const copyToClipboard = (content='拷贝的内容') => {
  if(copy(content)){
    message.success('上传成功，已拷贝到剪贴板')
  }else{
    message.warning('上传成功，拷贝到剪贴板失败， 请手动拷贝地址：' + content, 10)
  }

}
const plugins = [
  gfm(),
  // frontmatter(),
  // gemoji(),
  highlight(),
  image({
    async upload(files) {
      // TODO: upload image files and return urls
      if(files.length < 1) return ['']

      let url = ''
      const callback = (data) => {
        url = data;
        copyToClipboard(url)
      };
      await UploadFile(files[0], callback);
      // console.log("url", url, resp)
      return [url]
    }
  }),
  math(), zoom(), mermaid(),
  // vega(),
  // Add more plugins here
];


export const Editor = ({value, setValue}) => {

  return (
      <ByteEditor
          value={value}
          plugins={plugins}
          onChange={setValue}
          editorConfig={{}}
      />
  )
}
export const Viewer = ({value}) => {
  return (
      <ByteViewer
          value={value}
          plugins={plugins}
      />
  )
}
