import { stringify } from 'qs';

import request from 'umi-request';

export async function checkLogin() {
  return request('/Golang/Login/Check', {
    method: 'post',
  });
}

export async function fakeAccountLogin(params) {
  return request('/Golang/Login', {
    method: 'post',
    data: params,
  });
  
}

export async function getTags() {
  return request(`/Golang/Tags`);
}

export async function InsertArticle(params) {
  return request('/Golang/Article/Insert ', {
    method: 'post',
    data: params,
  });
}
export async function UpdateArticle(params) {
  return request(`/Golang/Article/Update/${params.oldUrl}`, {
    method: 'post',
    data: params,
  });
}

export async function getArticleList() {
  return request(`/Golang/Article`);
}

export async function getArticle(params) {
  return request(`/Golang/Article/${params.url}`);
}

export async function deleteArticle(params) {
  return request(`/Golang/Article/${params.url}`, {
    method: 'DELETE',
  })
}

export async function getTopicArticleList() {
  return request(`/Golang/Article?limit=1000000&offset=0`);
}

export async function getTopics() {
  return request(`/Golang/Topic`);
}

export async function getTopic(params) {
  return request(`/Golang/Topic/${params.url}`);
}

export async function InsertTopic(params) {
  return request('/Golang/Topic/Insert ', {
    method: 'post',
    data: params,
  });
}
export async function UpdateTopic(params) {
  return request(`/Golang/Topic/Update/${params.oldUrl}`, {
    method: 'post',
    data: params,
  });
}

export async function DeleteTopic(params) {
  return request(`/Golang/Topic/${params.url}`, {
    method: 'DELETE',
  })
}

export async function getProjects() {
  return request(`/Golang/Project`);
}

export async function getProject(params) {
  return request(`/Golang/Project/${params.url}`);
}

export async function InsertProject(params) {
  return request('/Golang/Project/Insert ', {
    method: 'post',
    data: params,
  });
}
export async function UpdateProject(params) {
  return request(`/Golang/Project/Update/${params.oldUrl}`, {
    method: 'post',
    data: params,
  });
}

export async function DeleteProject(params) {
  return request(`/Golang/Project/${params.url}`, {
    method: 'DELETE',
  })
}

export async function uploadFile(params) {
  return request(`/scripts/upload`, {
    method: 'post',
    data: params,
  });
}
