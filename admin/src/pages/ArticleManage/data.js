import { getLoginInfo } from '../../utils/authority';
import React from 'react';
import {Link} from 'react-router-dom';
//import {Link} from 'umi/link';
import router from 'umi/router';

export const InitArticleInsertState = {
  title: "",
  site: "江苏南京",
  url: "",
  author: getLoginInfo().loginUser,
  summary: "",
  content:"" ,
  toc: [],
  tags: [],
  logoUrl: "",
  isPublic: "true",
};

export const InitArticleEditState = {
  title: "",
  site: "江苏南京",
  url: "",
  author: "",
  summary: "",
  content: '',
  toc: [],
  tags: [],
  logoUrl: "",
  isPublic: "",
};
