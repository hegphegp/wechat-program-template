// const app = getApp()
var storage = require("../utils/storageUtils.js");

const combineUrl = (url, params = {}) => {
    if (url != null && url != 'undefined' && url != "") {
        Object.keys(params).forEach((key, index) => {
            var value = params[key];
            value = encodeURIComponent(value); // 数组变量时，主动编码成正确格式，springmvc可以直接接收
            var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
            var tmp = key + "=" + value;
            if (url.match(reg) != null) {
                url = url.replace(eval(reg), tmp);
            } else {
                var combine = url.match("[\?]")? "&":"?";
                url = url + combine + tmp;
            }
        });
    }
    return url;
}

const request = (url, method, options, checkToken) => {
  return new Promise((resolve, reject) => {
    checkToken = (checkToken===null || checkToken===undefined)? true:checkToken; // 默认不传会校验token
    if (checkToken===true) {
      const token = storage.getStorage('token');
      if (token===null || token===undefined) {
        // 执行一个wx.login()获取授权码code，然后通过appId，appSecret，code获取微信用户信息，然后自己开发的后台再生成一个token
        storage.setStorage('aaa', 'aaaa');
        storage.setStorage('bbb', 'bbb', 10000)
      }
    }
    url = combineUrl(url, options.urlParams);
    url = `http://10.36.71.183:8088${url}`
    let bodyParams = options.bodyParams;
    options.bodyParams = (bodyParams===null || bodyParams===undefined)? {}:bodyParams;
    
    wx.request({
//    url: `${app.globalData.host}${url}`,
      url: url,
      method: method,
      data: method === 'GET' ? '' : JSON.stringify(options.bodyParams),
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-token': 'x-token'  // 看自己是否需要
      },
      success(request) {
        if (request.statusCode === 200 && request.data.code === 200) {
            resolve(request.data)
        }
      },
      fail(error) {
        reject(error.data)
      }
    })
  })
}

/**
 * options的取值格式 
 * {
 *     "urlParams": {
 *     },
 *     "bodyParams": {
 *     },
 *     "checkToken": true
 * }
 */
const get = (url, options = {}, checkToken = true) => {
  return request(url, 'GET',  options, checkToken)
}

const post = (url, options = {}, checkToken = true) => {
   return request(url, 'POST', options, checkToken)
}

const put = (url, options = {}, checkToken = true) => {
   return request(url, 'PUT', options, checkToken)
}

// 不能声明DELETE（关键字）
const remove = (url, options = {}, checkToken = true) => {
   return request(url, 'DELETE', options, checkToken)
}

module.exports = {
   get,
   post,
   put,
   remove
}