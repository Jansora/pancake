import {getLoginInfo} from '../../utils/authority';
import React from 'react';


export const InitArticleInsertState = {
  title: "",
  site: "",
  url: "",
  author: getLoginInfo().loginUser,
  summary: "",
  content: "",
  toc: [],
  tags: [],
  logoUrl: "",
  isPublic: "true",
};

export const InitArticleEditState = {
  title: "",
  site: "",
  url: "",
  author: "",
  summary: "",
  content: '',
  toc: [],
  tags: [],
  logoUrl: "",
  isPublic: "",
};
