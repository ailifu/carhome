export const navigation = {
  navigateTo,
}


// 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
function navigateTo(url, params = {}) {
  let mergeUrl = url + '?' + toQueryString(params)
  // 判断字符串 第一个字符是不是 "/" 没有就加上
  if (getStringFirstChat(mergeUrl) !== "/") {
    mergeUrl = "/" + mergeUrl;
  }
  wx.navigateTo({
    url: mergeUrl
  });
}


// 获取字符串 前1个字符
function getStringFirstChat(string = "") {
  return string.substr(0, 1)
}

// 参数从对象转为字符串
export function toQueryString(obj) {
  var ret = [];
  for (var key in obj) {
    key = encodeURIComponent(key);
    var values = obj[key];
    if (values && values.constructor == Array) {//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}
export function toQueryPair(key, value, bo) {
  if (typeof value === 'undefined') {
    return key;
  }
  return key + '=' + (bo ? encodeURIComponent(value === null ? '' : String(value)) : value === null ? '' : String(
    value));
}