// const app = getApp()

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

const request = (url, options) => {
  return new Promise((resolve, reject) => {
    /**
    const param = {
        "urlParams":{
            "field01": "field01",
            "field04": ["field03", "aaaa"],
        }, "bodyParams":{
            "field01": "field01",
            "field02": "field02"
        }
    }
    */
    url = `http://10.36.71.183:8088${url}`
    url = combineUrl(url, options.urlParams);

    wx.request({
//    url: `${app.globalData.host}${url}`,
      url: url,
      method: options.method,
      data: options.method === 'GET' ? '' : JSON.stringify(options.data),
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

const get = (url, options = {}) => {
  return request(url, { method: 'GET', data: options })
}

const post = (url, options = {}) => {
   return request(url, { method: 'POST', data: options })
}

const put = (url, options = {}) => {
   return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options = {}) => {
   return request(url, { method: 'DELETE', data: options })
}

module.exports = {
   get,
   post,
   put,
   remove
}