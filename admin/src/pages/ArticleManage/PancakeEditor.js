import React from 'react'

import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
import mk from 'markdown-it-katex'
import mc from 'markdown-it-custom-block'
import kbd from 'markdown-it-kbd'

import 'highlight.js/styles/atom-one-light.css'
import './override.less'
import {upload} from '../../services/golang';
import {message} from 'antd';
// import 'highlight.js/styles/github.css'
// import "katex/dist/katex.min.css"


const PancakeEditor = (props) => {
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {
        }
      }
      return '' // use external default escaping
    },
  })
    .use(emoji)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(mk)
    .use(kbd)
    .use(tasklists, {enabled: true})
    .use(mc, {
      img(url) {
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;"><img src="${url}" alt=${url}/></div>`
      },
      video(url) {
        return `<video controls><source src="${url}" type="video/mp4"></video>`
      },
      scripts(script) {
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">${script}</div>>`
      },
      iframe(script) {
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
             <iframe width="100%" height="500" frameborder="0" scrolling="no" src="${script.trim()}"></iframe>
          </div>>`
      },
    });
  const handleImageUpload = (file, callback) => {


    const formData = new FormData();
    formData.append('file', file);

    const response = upload(formData);
    response.then(e => {

      if (e.ret) {
        callback(`https://${e.res}`)
      } else {
        message.error(`上传失败：${e.res}`)
      }

    })

  }

  const renderHTML = (text) => {
    // 模拟异步渲染Markdown
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mdParser.render(text))
      }, 500)
    })
  }

  return (
    <div>
      <MdEditor
        style={{height: 800}}
        ref={props.EditorRef}
        renderHTML={renderHTML}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
          },
          synchScroll: false,
        }}
        value=""
        onImageUpload={handleImageUpload}
        {...props}
      />
    </div>

  )

}

export default PancakeEditor;
