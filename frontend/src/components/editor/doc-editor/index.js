import styled from "styled-components";

import Editor from "./editor";

const DocEditor = styled(Editor)`
  
  margin: 0 -1px;

  div.rc-md-editor{
    ${props => props.readonly && 'border: none;'};

  }
  div.rc-md-navigation {
    position: sticky;
    top: 50px;
    z-index: 1;
    height: 50px;
    background: white;
  }
  background: none;

  line-height: 1;
  
  div.tool-bar {
     ${props => props.readonly && 'display: none;'};
  }
  div.html-wrap{
      overflow: inherit !important;
  }
 
  
  @font-face {
      font-family: octicons-link;
      src: url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAZwABAAAAAACFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEU0lHAAAGaAAAAAgAAAAIAAAAAUdTVUIAAAZcAAAACgAAAAoAAQAAT1MvMgAAAyQAAABJAAAAYFYEU3RjbWFwAAADcAAAAEUAAACAAJThvmN2dCAAAATkAAAABAAAAAQAAAAAZnBnbQAAA7gAAACyAAABCUM+8IhnYXNwAAAGTAAAABAAAAAQABoAI2dseWYAAAFsAAABPAAAAZwcEq9taGVhZAAAAsgAAAA0AAAANgh4a91oaGVhAAADCAAAABoAAAAkCA8DRGhtdHgAAAL8AAAADAAAAAwGAACfbG9jYQAAAsAAAAAIAAAACABiATBtYXhwAAACqAAAABgAAAAgAA8ASm5hbWUAAAToAAABQgAAAlXu73sOcG9zdAAABiwAAAAeAAAAME3QpOBwcmVwAAAEbAAAAHYAAAB/aFGpk3jaTY6xa8JAGMW/O62BDi0tJLYQincXEypYIiGJjSgHniQ6umTsUEyLm5BV6NDBP8Tpts6F0v+k/0an2i+itHDw3v2+9+DBKTzsJNnWJNTgHEy4BgG3EMI9DCEDOGEXzDADU5hBKMIgNPZqoD3SilVaXZCER3/I7AtxEJLtzzuZfI+VVkprxTlXShWKb3TBecG11rwoNlmmn1P2WYcJczl32etSpKnziC7lQyWe1smVPy/Lt7Kc+0vWY/gAgIIEqAN9we0pwKXreiMasxvabDQMM4riO+qxM2ogwDGOZTXxwxDiycQIcoYFBLj5K3EIaSctAq2kTYiw+ymhce7vwM9jSqO8JyVd5RH9gyTt2+J/yUmYlIR0s04n6+7Vm1ozezUeLEaUjhaDSuXHwVRgvLJn1tQ7xiuVv/ocTRF42mNgZGBgYGbwZOBiAAFGJBIMAAizAFoAAABiAGIAznjaY2BkYGAA4in8zwXi+W2+MjCzMIDApSwvXzC97Z4Ig8N/BxYGZgcgl52BCSQKAA3jCV8CAABfAAAAAAQAAEB42mNgZGBg4f3vACQZQABIMjKgAmYAKEgBXgAAeNpjYGY6wTiBgZWBg2kmUxoDA4MPhGZMYzBi1AHygVLYQUCaawqDA4PChxhmh/8ODDEsvAwHgMKMIDnGL0x7gJQCAwMAJd4MFwAAAHjaY2BgYGaA4DAGRgYQkAHyGMF8NgYrIM3JIAGVYYDT+AEjAwuDFpBmA9KMDEwMCh9i/v8H8sH0/4dQc1iAmAkALaUKLgAAAHjaTY9LDsIgEIbtgqHUPpDi3gPoBVyRTmTddOmqTXThEXqrob2gQ1FjwpDvfwCBdmdXC5AVKFu3e5MfNFJ29KTQT48Ob9/lqYwOGZxeUelN2U2R6+cArgtCJpauW7UQBqnFkUsjAY/kOU1cP+DAgvxwn1chZDwUbd6CFimGXwzwF6tPbFIcjEl+vvmM/byA48e6tWrKArm4ZJlCbdsrxksL1AwWn/yBSJKpYbq8AXaaTb8AAHja28jAwOC00ZrBeQNDQOWO//sdBBgYGRiYWYAEELEwMTE4uzo5Zzo5b2BxdnFOcALxNjA6b2ByTswC8jYwg0VlNuoCTWAMqNzMzsoK1rEhNqByEyerg5PMJlYuVueETKcd/89uBpnpvIEVomeHLoMsAAe1Id4AAAAAAAB42oWQT07CQBTGv0JBhagk7HQzKxca2sJCE1hDt4QF+9JOS0nbaaYDCQfwCJ7Au3AHj+LO13FMmm6cl7785vven0kBjHCBhfpYuNa5Ph1c0e2Xu3jEvWG7UdPDLZ4N92nOm+EBXuAbHmIMSRMs+4aUEd4Nd3CHD8NdvOLTsA2GL8M9PODbcL+hD7C1xoaHeLJSEao0FEW14ckxC+TU8TxvsY6X0eLPmRhry2WVioLpkrbp84LLQPGI7c6sOiUzpWIWS5GzlSgUzzLBSikOPFTOXqly7rqx0Z1Q5BAIoZBSFihQYQOOBEdkCOgXTOHA07HAGjGWiIjaPZNW13/+lm6S9FT7rLHFJ6fQbkATOG1j2OFMucKJJsxIVfQORl+9Jyda6Sl1dUYhSCm1dyClfoeDve4qMYdLEbfqHf3O/AdDumsjAAB42mNgYoAAZQYjBmyAGYQZmdhL8zLdDEydARfoAqIAAAABAAMABwAKABMAB///AA8AAQAAAAAAAAAAAAAAAAABAAAAAA==) format('woff');
    }

.custom-html-style .octicon {
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
}

.custom-html-style .anchor {
  float: left;
  line-height: 1;
  margin-left: -20px;
  padding-right: 4px;
}

.custom-html-style .anchor:focus {
  outline: none;
}

.custom-html-style h1 .octicon-link,
.custom-html-style h2 .octicon-link,
.custom-html-style h3 .octicon-link,
.custom-html-style h4 .octicon-link,
.custom-html-style h5 .octicon-link,
.custom-html-style h6 .octicon-link {
  color: #1b1f23;
  vertical-align: middle;
  visibility: hidden;
}

.custom-html-style h1:hover .anchor,
.custom-html-style h2:hover .anchor,
.custom-html-style h3:hover .anchor,
.custom-html-style h4:hover .anchor,
.custom-html-style h5:hover .anchor,
.custom-html-style h6:hover .anchor {
  text-decoration: none;
}

.custom-html-style h1:hover .anchor .octicon-link,
.custom-html-style h2:hover .anchor .octicon-link,
.custom-html-style h3:hover .anchor .octicon-link,
.custom-html-style h4:hover .anchor .octicon-link,
.custom-html-style h5:hover .anchor .octicon-link,
.custom-html-style h6:hover .anchor .octicon-link {
  visibility: visible;
}

.custom-html-style {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  color: #24292e;
  line-height: 1.5;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-size: 16px;
  word-wrap: break-word;
}

.custom-html-style .pl-c {
  color: #6a737d;
}

.custom-html-style .pl-c1,
.custom-html-style .pl-s .pl-v {
  color: #005cc5;
}

.custom-html-style .pl-e,
.custom-html-style .pl-en {
  color: #6f42c1;
}

.custom-html-style .pl-s .pl-s1,
.custom-html-style .pl-smi {
  color: #24292e;
}

.custom-html-style .pl-ent {
  color: #22863a;
}

.custom-html-style .pl-k {
  color: #d73a49;
}

.custom-html-style .pl-pds,
.custom-html-style .pl-s,
.custom-html-style .pl-s .pl-pse .pl-s1,
.custom-html-style .pl-sr,
.custom-html-style .pl-sr .pl-cce,
.custom-html-style .pl-sr .pl-sra,
.custom-html-style .pl-sr .pl-sre {
  color: #032f62;
}

.custom-html-style .pl-smw,
.custom-html-style .pl-v {
  color: #e36209;
}

.custom-html-style .pl-bu {
  color: #b31d28;
}

.custom-html-style .pl-ii {
  background-color: #b31d28;
  color: #fafbfc;
}

.custom-html-style .pl-c2 {
  background-color: #d73a49;
  color: #fafbfc;
}

.custom-html-style .pl-c2:before {
  content: "^M";
}

.custom-html-style .pl-sr .pl-cce {
  color: #22863a;
  font-weight: 700;
}

.custom-html-style .pl-ml {
  color: #735c0f;
}

.custom-html-style .pl-mh,
.custom-html-style .pl-mh .pl-en,
.custom-html-style .pl-ms {
  color: #005cc5;
  font-weight: 700;
}

.custom-html-style .pl-mi {
  color: #24292e;
  font-style: italic;
}

.custom-html-style .pl-mb {
  color: #24292e;
  font-weight: 700;
}

.custom-html-style .pl-md {
  background-color: #ffeef0;
  color: #b31d28;
}

.custom-html-style .pl-mi1 {
  background-color: #f0fff4;
  color: #22863a;
}

.custom-html-style .pl-mc {
  background-color: #ffebda;
  color: #e36209;
}

.custom-html-style .pl-mi2 {
  background-color: #005cc5;
  color: #f6f8fa;
}

.custom-html-style .pl-mdr {
  color: #6f42c1;
  font-weight: 700;
}

.custom-html-style .pl-ba {
  color: #586069;
}

.custom-html-style .pl-sg {
  color: #959da5;
}

.custom-html-style .pl-corl {
  color: #032f62;
  text-decoration: underline;
}

.custom-html-style details {
  display: block;
}

.custom-html-style summary {
  display: list-item;
}

.custom-html-style a {
  background-color: transparent;
}

.custom-html-style a:active,
.custom-html-style a:hover {
  outline-width: 0;
}

.custom-html-style strong {
  font-weight: inherit;
  font-weight: bolder;
}

.custom-html-style h1 {
  font-size: 2em;
  margin: .67em 0;
}

.custom-html-style img {
  border-style: none;
}

.custom-html-style code,
.custom-html-style kbd,
.custom-html-style pre {
  font-family: monospace,monospace;
  font-size: 1em;
}

.custom-html-style hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

.custom-html-style input {
  font: inherit;
  margin: 0;
}

.custom-html-style input {
  overflow: visible;
}

.custom-html-style [type=checkbox] {
  box-sizing: border-box;
  padding: 0;
}

.custom-html-style * {
  box-sizing: border-box;
}

.custom-html-style input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.custom-html-style a {
  color: #0366d6;
  text-decoration: none;
}

.custom-html-style a:hover {
  text-decoration: underline;
}

.custom-html-style strong {
  font-weight: 600;
}

.custom-html-style hr {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
  height: 0;
  margin: 15px 0;
  overflow: hidden;
}

.custom-html-style hr:before {
  content: "";
  display: table;
}

.custom-html-style hr:after {
  clear: both;
  content: "";
  display: table;
}

.custom-html-style table {
  border-collapse: collapse;
  border-spacing: 0;
}

.custom-html-style td,
.custom-html-style th {
  padding: 0;
}

.custom-html-style details summary {
  cursor: pointer;
}

.custom-html-style h1,
.custom-html-style h2,
.custom-html-style h3,
.custom-html-style h4,
.custom-html-style h5,
.custom-html-style h6 {
  margin-bottom: 0;
  margin-top: 0;
}

.custom-html-style h1 {
  font-size: 32px;
}

.custom-html-style h1,
.custom-html-style h2 {
  font-weight: 600;
}

.custom-html-style h2 {
  font-size: 24px;
}

.custom-html-style h3 {
  font-size: 20px;
}

.custom-html-style h3,
.custom-html-style h4 {
  font-weight: 600;
}

.custom-html-style h4 {
  font-size: 16px;
}

.custom-html-style h5 {
  font-size: 14px;
}

.custom-html-style h5,
.custom-html-style h6 {
  font-weight: 600;
}

.custom-html-style h6 {
  font-size: 12px;
}

.custom-html-style p {
  margin-bottom: 10px;
  margin-top: 0;
}

.custom-html-style blockquote {
  margin: 0;
}

.custom-html-style ol,
.custom-html-style ul {
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
}

.custom-html-style ol ol,
.custom-html-style ul ol {
  list-style-type: lower-roman;
}

.custom-html-style ol ol ol,
.custom-html-style ol ul ol,
.custom-html-style ul ol ol,
.custom-html-style ul ul ol {
  list-style-type: lower-alpha;
}

.custom-html-style dd {
  margin-left: 0;
}

.custom-html-style code,
.custom-html-style pre {
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  font-size: 12px;
}

.custom-html-style pre {
  margin-bottom: 0;
  margin-top: 0;
}

.custom-html-style input::-webkit-inner-spin-button,
.custom-html-style input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

.custom-html-style .border {
  border: 1px solid #e1e4e8!important;
}

.custom-html-style .border-0 {
  border: 0!important;
}

.custom-html-style .border-bottom {
  border-bottom: 1px solid #e1e4e8!important;
}

.custom-html-style .rounded-1 {
  border-radius: 3px!important;
}

.custom-html-style .bg-white {
  background-color: #fff!important;
}

.custom-html-style .bg-gray-light {
  background-color: #fafbfc!important;
}

.custom-html-style .text-gray-light {
  color: #6a737d!important;
}

.custom-html-style .mb-0 {
  margin-bottom: 0!important;
}

.custom-html-style .my-2 {
  margin-bottom: 8px!important;
  margin-top: 8px!important;
}

.custom-html-style .pl-0 {
  padding-left: 0!important;
}

.custom-html-style .py-0 {
  padding-bottom: 0!important;
  padding-top: 0!important;
}

.custom-html-style .pl-1 {
  padding-left: 4px!important;
}

.custom-html-style .pl-2 {
  padding-left: 8px!important;
}

.custom-html-style .py-2 {
  padding-bottom: 8px!important;
  padding-top: 8px!important;
}

.custom-html-style .pl-3,
.custom-html-style .px-3 {
  padding-left: 16px!important;
}

.custom-html-style .px-3 {
  padding-right: 16px!important;
}

.custom-html-style .pl-4 {
  padding-left: 24px!important;
}

.custom-html-style .pl-5 {
  padding-left: 32px!important;
}

.custom-html-style .pl-6 {
  padding-left: 40px!important;
}

.custom-html-style .f6 {
  font-size: 12px!important;
}

.custom-html-style .lh-condensed {
  line-height: 1.25!important;
}

.custom-html-style .text-bold {
  font-weight: 600!important;
}

.custom-html-style:before {
  content: "";
  display: table;
}

.custom-html-style:after {
  clear: both;
  content: "";
  display: table;
}

.custom-html-style>:first-child {
  margin-top: 0!important;
}

.custom-html-style>:last-child {
  margin-bottom: 0!important;
}

.custom-html-style a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.custom-html-style blockquote,
.custom-html-style dl,
.custom-html-style ol,
.custom-html-style p,
.custom-html-style pre,
.custom-html-style table,
.custom-html-style ul {
  margin-bottom: 16px;
  margin-top: 0;
}

.custom-html-style hr {
  background-color: #e1e4e8;
  border: 0;
  height: .25em;
  margin: 24px 0;
  padding: 0;
}

.custom-html-style blockquote {
  border-left: .25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
}

.custom-html-style blockquote>:first-child {
  margin-top: 0;
}

.custom-html-style blockquote>:last-child {
  margin-bottom: 0;
}

.custom-html-style kbd {
  background-color: #fafbfc;
  border: 1px solid #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
  color: #444d56;
  display: inline-block;
  font-size: 11px;
  line-height: 10px;
  padding: 3px 5px;
  vertical-align: middle;
}

.custom-html-style h1,
.custom-html-style h2,
.custom-html-style h3,
.custom-html-style h4,
.custom-html-style h5,
.custom-html-style h6 {
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 16px;
  margin-top: 24px;
}

.custom-html-style h1 {
  font-size: 2em;
}

.custom-html-style h1,
.custom-html-style h2 {
  border-bottom: 1px solid #eaecef;
  padding-bottom: .3em;
}

.custom-html-style h2 {
  font-size: 1.5em;
}

.custom-html-style h3 {
  font-size: 1.25em;
}

.custom-html-style h4 {
  font-size: 1em;
}

.custom-html-style h5 {
  font-size: .875em;
}

.custom-html-style h6 {
  color: #6a737d;
  font-size: .85em;
}

.custom-html-style ol,
.custom-html-style ul {
  padding-left: 2em;
}

.custom-html-style ol ol,
.custom-html-style ol ul,
.custom-html-style ul ol,
.custom-html-style ul ul {
  margin-bottom: 0;
  margin-top: 0;
}

.custom-html-style li {
  word-wrap: break-all;
}

.custom-html-style li>p {
  margin-top: 16px;
}

.custom-html-style li+li {
  margin-top: .25em;
}

.custom-html-style dl {
  padding: 0;
}

.custom-html-style dl dt {
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
  margin-top: 16px;
  padding: 0;
}

.custom-html-style dl dd {
  margin-bottom: 16px;
  padding: 0 16px;
}

.custom-html-style table {
  display: block;
  overflow: auto;
  width: 100%;
}

.custom-html-style table th {
  font-weight: 600;
}

.custom-html-style table td,
.custom-html-style table th {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.custom-html-style table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.custom-html-style table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.custom-html-style img {
  background-color: #fff;
  box-sizing: content-box;
  max-width: 100%;
}

.custom-html-style img[align=right] {
  padding-left: 20px;
}

.custom-html-style img[align=left] {
  padding-right: 20px;
}

.custom-html-style code {
  background-color: rgba(27,31,35,.05);
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  padding: .2em .4em;
}

.custom-html-style pre {
  word-wrap: normal;
}

.custom-html-style pre>code {
  background: transparent;
  border: 0;
  font-size: 100%;
  margin: 0;
  padding: 0;
  white-space: pre;
  word-break: normal;
}

.custom-html-style .highlight {
  margin-bottom: 16px;
}

.custom-html-style .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.custom-html-style .highlight pre,
.custom-html-style pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  font-size: 14px;
  //line-height: 1.45;
  overflow: auto;
  padding: 16px;
}

.custom-html-style pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
}

.custom-html-style .commit-tease-sha {
  color: #444d56;
  display: inline-block;
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  font-size: 90%;
}

.custom-html-style .blob-wrapper {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  overflow-x: auto;
  overflow-y: hidden;
}

.custom-html-style .blob-wrapper-embedded {
  max-height: 240px;
  overflow-y: auto;
}

.custom-html-style .blob-num {
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  color: rgba(27,31,35,.3);
  cursor: pointer;
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  font-size: 12px;
  line-height: 20px;
  min-width: 50px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: right;
  user-select: none;
  vertical-align: top;
  white-space: nowrap;
  width: 1%;
}

.custom-html-style .blob-num:hover {
  color: rgba(27,31,35,.6);
}

.custom-html-style .blob-num:before {
  content: attr(data-line-number);
}

.custom-html-style .blob-code {
  line-height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  vertical-align: top;
}

.custom-html-style .blob-code-inner {
  color: #24292e;
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  font-size: 12px;
  overflow: visible;
  white-space: pre;
  word-wrap: normal;
}

.custom-html-style .pl-token.active,
.custom-html-style .pl-token:hover {
  background: #ffea7f;
  cursor: pointer;
}

.custom-html-style kbd {
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
  border-bottom-color: #c6cbd1;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #c6cbd1;
  color: #444d56;
  display: inline-block;
  font: 11px SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
  line-height: 10px;
  padding: 3px 5px;
  vertical-align: middle;
}

.custom-html-style :checked+.radio-label {
  border-color: #0366d6;
  position: relative;
  z-index: 1;
}

.custom-html-style .tab-size[data-tab-size="1"] {
  -moz-tab-size: 1;
  tab-size: 1;
}

.custom-html-style .tab-size[data-tab-size="2"] {
  -moz-tab-size: 2;
  tab-size: 2;
}

.custom-html-style .tab-size[data-tab-size="3"] {
  -moz-tab-size: 3;
  tab-size: 3;
}

.custom-html-style .tab-size[data-tab-size="4"] {
  -moz-tab-size: 4;
  tab-size: 4;
}

.custom-html-style .tab-size[data-tab-size="5"] {
  -moz-tab-size: 5;
  tab-size: 5;
}

.custom-html-style .tab-size[data-tab-size="6"] {
  -moz-tab-size: 6;
  tab-size: 6;
}

.custom-html-style .tab-size[data-tab-size="7"] {
  -moz-tab-size: 7;
  tab-size: 7;
}

.custom-html-style .tab-size[data-tab-size="8"] {
  -moz-tab-size: 8;
  tab-size: 8;
}

.custom-html-style .tab-size[data-tab-size="9"] {
  -moz-tab-size: 9;
  tab-size: 9;
}

.custom-html-style .tab-size[data-tab-size="10"] {
  -moz-tab-size: 10;
  tab-size: 10;
}

.custom-html-style .tab-size[data-tab-size="11"] {
  -moz-tab-size: 11;
  tab-size: 11;
}

.custom-html-style .tab-size[data-tab-size="12"] {
  -moz-tab-size: 12;
  tab-size: 12;
}

.custom-html-style .task-list-item {
  list-style-type: none;
}

.custom-html-style .task-list-item+.task-list-item {
  margin-top: 3px;
}

.custom-html-style .task-list-item input {
  margin: 0 .2em .25em -1.6em;
  vertical-align: middle;
}

.custom-html-style hr {
  border-bottom-color: #eee;
}

.custom-html-style .pl-0 {
  padding-left: 0!important;
}

.custom-html-style .pl-1 {
  padding-left: 4px!important;
}

.custom-html-style .pl-2 {
  padding-left: 8px!important;
}

.custom-html-style .pl-3 {
  padding-left: 16px!important;
}

.custom-html-style .pl-4 {
  padding-left: 24px!important;
}

.custom-html-style .pl-5 {
  padding-left: 32px!important;
}

.custom-html-style .pl-6 {
  padding-left: 40px!important;
}

.custom-html-style .pl-7 {
  padding-left: 48px!important;
}

.custom-html-style .pl-8 {
  padding-left: 64px!important;
}

.custom-html-style .pl-9 {
  padding-left: 80px!important;
}

.custom-html-style .pl-10 {
  padding-left: 96px!important;
}

.custom-html-style .pl-11 {
  padding-left: 112px!important;
}

.custom-html-style .pl-12 {
  padding-left: 128px!important;
}

.custom-html-style {
    background: white;
    p{
        white-space: pre-line;
        overflow-wrap: break-word;
    }
    blockquote{
        margin: 1em 0;
        //padding-left: .8em;
        padding: 8px;
        color: #697b8c;
        font-size: 90%;
        border-left: 4px solid #ebedf0;
    }
    span.base, a{
      color: var(--primary-color) !important;
    }
    span.katex{
      font: 400 1.16em KaTeX_Main;
    }
    table{
      margin: auto;
    }
    h1 {
    font-size: 25px;
          margin: 16px 0;
    }
    h2 {
          margin: 8px 0;
          font-size: 20px;
    }
    
    code{
        color: var(--primary-color);
        padding: 0 3px;
        margin: 0 3px;
    }
    pre {
     
        margin: 0 0 10px 0;
        padding: 10px;
        code{
          color: black;
          padding: 0;
          margin: 0;
        }
    }
    
    ol, ul{
       padding-left: 14px;
       li{
          padding-left: 3px;
       }
    }

  }
`;

export default DocEditor;
