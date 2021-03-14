const keyPrefix = 'aaaa:';

const setStorage = (key, data) => {
  setStorageTime(key, data, null);
}

const setStorageTime = (key, data, expireMilliseconds) => {
  const keyData = {}
  keyData.data = data;
  if (expireMilliseconds!=null && expireMilliseconds!=undefined) {
    keyData.expireTime = new Date().getMilliseconds()+expireMilliseconds; // 存储有效时间的毫秒级时间戳
  }
  wx.setStorageSync(keyPrefix+key, keyData);
}

const removeStorage = (key) => {
  wx.removeStorageSync({
    key: keyPrefix+key,
  })
}

const getStorage = (key) => {
  const data = wx.getStorageSync(keyPrefix+key);
  if (data===null || data===undefined) return null;
  let expireTime = data.expireTime;
  if (expireTime===null || expireTime===undefined) return data.data;
  if (new Date().getMilliseconds()>expireTime) { // 已过期
    removeStorage(keyPrefix+key);
    return null;
  } else {
    return data.data;
  }
}

/**
 * 延长某个key的缓存时间
 * @param {*} key 
 * @param {*} expireMilliseconds 
 */
const expireTimeStorage = (key, expireMilliseconds) => {
  const data = wx.getStorageSync(keyPrefix+key);
  if (data===null || data===undefined) return;
  setStorageTime(key, data.data, expireMilliseconds)
}

module.exports = {
  setStorage,
  setStorageTime,
  removeStorage,
  getStorage,
  expireTimeStorage
}

