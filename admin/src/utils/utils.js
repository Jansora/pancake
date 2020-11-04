import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);


// 更新单层数组某一项 （原数组， 待更新项， 待更新索引（从0开始计算））
export const updateSingleArrayItem = (arr, replaceItem, replaceIndex) =>
  arr.map((item, index) =>
    (index === replaceIndex ? replaceItem : item));


// 更新双层数组某一项 （原数组， 待更新项， 外层待更新索引， 内层待更新索引（从0开始计算）
export const updateDoubleArrayItem = (arr, replaceItem, outIndex1, innerIndex1) =>
  updateSingleArrayItem(
    arr, updateSingleArrayItem(
      arr[outIndex1], replaceItem, innerIndex1), outIndex1,
  );


// 删除单层数组某一项 （原数组， 待删除项， 待删除索引（从0开始计算））
export const deleteSingleArrayItem = (arr, deleteIndex) =>
  arr.filter((item, index) =>
    (index !== deleteIndex));


// 删除双层数组某一项 （原数组， 待更新项， 外层待删除索引， 内层待删除索引（从0开始计算）
export const deleteDoubleArrayItem = (arr, outIndex1, innerIndex1) =>
  updateSingleArrayItem(
    arr, deleteSingleArrayItem(
      arr[outIndex1], innerIndex1), outIndex1,
  );
