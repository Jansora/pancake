import axios from 'axios';

export const client = axios.create({
  baseURL: "/Golang/",
  }
);

export const format = (data) => Object.keys(data).map(i => encodeURIComponent(i) + '=' + encodeURIComponent(data[i])).join('&');
