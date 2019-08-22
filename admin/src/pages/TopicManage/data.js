import { getLoginInfo } from '../../utils/authority';
import React from 'react';
import {Link} from 'react-router-dom';
//import {Link} from 'umi/link';
import router from 'umi/router';

export const InitArticleInsertState = {
    title: "可视化最有价值的 50 个图表",
    site: "江苏南京",
    url: "",
    author: getLoginInfo().loginUser,
    summary: "本文总结了 Matplotlib 以及 Seaborn 用的最多的50个图形，掌握这些图形的绘制，对于数据分析的可视化有莫大的作用，强烈推荐大家阅读后续内容。",
    content:"# 0-可视化最有价值的 50 个图表\n" ,
    toc: [],
    tags: [],
    logoUrl: "https://cdn.nlark.com/yuque/0/2019/png/200056/1547290679843-d8712747-6a43-4045-8dfb-ce3f7769bd2e.png",
    isPublic: "true",
};

export const InitArticleEditState = {
  title: "",
  site: "江苏南京",
  url: "",
  author: "",
  summary: "",
  content:"" ,
  toc: [],
  tags: [],
  logoUrl: "",
  isPublic: "",
};
