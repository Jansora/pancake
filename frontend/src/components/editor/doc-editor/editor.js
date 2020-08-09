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
import {UploadFile} from "../../../request/utils";

import 'react-markdown-editor-lite/lib/index.css';

// import 'highlight.js/styles/github.css'
// import "katex/dist/katex.min.css"


const Editor = (props) => {

  const {readonly} = props;

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
          const srcs = src.split(" ");
          const url = srcs.length > 0 ? srcs[0] : ""
          const height = srcs.length > 1 ? srcs[1] : 500
            if (!readonly)
                return `<div style="
height: 50px;
display: flex; align-items: center; justify-content: center;">
            编辑模式下已禁止渲染iframe ， <a target="_blank" rel="noreferrer" href="${url.trim()}" style=""> 在新窗口打开 </a>
          </div>`

            return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <a target="_blank" rel="noreferrer" href="${url.trim()}" style="align-self: flex-end"> 在新窗口打开 </a>
             <iframe 
             height="${height}"
             width="100%" 
             frameborder="0"
             src="${url.trim()}" allowfullscreen></iframe>
          </div>`
          },
      });

    const handleImageUpload = (file, callback) => {

        const formData = new FormData();
        formData.append('file', file);

        UploadFile(formData, callback);

    }

    const renderHTML = (text) => {
        // 模拟异步渲染Markdown
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mdParser.render(text))
            }, 500)
        })
    }

    const view = readonly ?
        {menu: false, md: false, html: true} : {menu: true, md: true, html: true};
    return (
        <div className={props.className ? props.className : ""}>
            <MdEditor
                renderHTML={renderHTML}
                config={{view, synchScroll: false,}}
                value=""
                ref={props.EditorRef}
                onImageUpload={handleImageUpload}
                {...props}
            />
        </div>

    )

}

export default Editor;
