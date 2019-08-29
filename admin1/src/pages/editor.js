'use strict';
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
import mk from "markdown-it-katex"
import mc from "markdown-it-custom-block";

import 'highlight.js/styles/atom-one-light.css'

// import 'highlight.js/styles/github.css'
// import "katex/dist/katex.min.css"


const PancakeEditor = () => {
  
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
      }
      return '' // use external default escaping
    }
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
    .use(tasklists, { enabled: this.taskLists })
    .use(mc, {
      img (url) {
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;"><img src="${url}" alt=${url}/></div>`
      },
      video (url) {
        return `<video controls><source src="${url}" type="video/mp4"></video>`
      },
      scripts (script) {
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">${script}</div>>`
      },
      iframe (url) {
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
             <iframe width="100%" height="500" frameborder="0" scrolling="no" src="${url.trim()}"></iframe>
          </div>>`
      },
    });
  
  const handleImageUpload = (file, callback) => {
    const reader = new FileReader()
    reader.onload = () => {
      const convertBase64UrlToBlob = (urlData) => {
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type:mime})
      }
      const blob = convertBase64UrlToBlob(reader.result)
      setTimeout(() => {
        // setTimeout 模拟异步上传图片
        // 当异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
        callback('https://avatars0.githubusercontent.com/u/21263805?s=40&v=4')
      }, 1000)
    }
    reader.readAsDataURL(file)
  }
  const renderHTML = (text) => {
    // 模拟异步渲染Markdown
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mdParser.render(text))
      }, 1000)
    })
  }
  
  
  return (
    <div>
      <section>
        <MdEditor
          ref={this.props.EditorRef}
          
          value=''
          style={{height: '400px'}}
          renderHTML={renderHTML}
          config={{
            view: {
              menu: true,
              md: true,
              html: true
            },
            imageUrl: 'https://octodex.github.com/images/minion.png'
          }}
          onChange={this.handleEditorChange}
          onImageUpload={handleImageUpload}
          {...this.props}
        />
      </section>
    </div>
  )
  
}

export default PancakeEditor;