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
import mk from "@iktakahiro/markdown-it-katex"
import mc from "markdown-it-custom-block";
import kbd from "markdown-it-kbd"
import 'highlight.js/styles/atom-one-light.css'


// import 'highlight.js/styles/github.css'
// import "katex/dist/katex.min.css"


const PancakeEditor = (props) => {

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
      .use(mk, {"throwOnError" : false, "errorColor" : " #cc0000"})
      .use(kbd)
      .use(tasklists, { enabled: true })
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
        iframe(src) {

            return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <a target="_blank" rel="noreferrer" href="${src.trim()}" style="align-self: flex-end"> 在新窗口打开 </a>
             <iframe 
             height="500"
             width="100%" 
             frameborder="0"
             src="${src.trim()}" allowfullscreen></iframe>
          </div>`
          },
      });

  const renderHTML = (text) => {
    // 模拟异步渲染Markdown
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mdParser.render(text))
      }, 500)
    })
  }
  

    return (
      <article  className={props.className} >
        <MdEditor
          // style={{height: '400px'}}
          renderHTML={renderHTML}
          config={{
            view: {
              menu: false,
              md: false,
              html: true,
            },
            synchScroll: false,
            imageUrl: 'https://octodex.github.com/images/minion.png'
          }}
          {...props}
        />
      </article>
    
    )
  
}

export default PancakeEditor;