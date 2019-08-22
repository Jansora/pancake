import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

export const client = axios.create({
  baseURL: "/Golang/",
  //baseURL: "https://api.jans.xin/",
  //headers: {'Access-Control-Allow-Origin': '*'},
  }
);

export const format = (data) => Object.keys(data).map(i => encodeURIComponent(i) + '=' + encodeURIComponent(data[i])).join('&');
