const keyPrefix = 'aaaa:';

const setStorage = (key, data, expireMilliseconds) => {
  wxSetStorageTime(key, data, expireMilliseconds, false);
}

const setStorageSync = (key, data, expireMilliseconds) => {
  wxSetStorageTime(key, data, expireMilliseconds, true);
}

const wxSetStorageTime = (key, data, expireMilliseconds, sync) => {
  const keyData = {}
  keyData.data = data;
  if (expireMilliseconds!=null && expireMilliseconds!=undefined) {
    keyData.expireTime = new Date().getTime()+expireMilliseconds; // 存储有效时间的毫秒级时间戳
  }
  if(sync!=null && sync!=undefined && sync===true) {
    wx.setStorageSync(keyPrefix+key, keyData);
  } else {
    wx.setStorage({key: keyPrefix+key, data: keyData});
  }
}

const removeStorage = (key) => {
  wx.removeStorage({
    key: keyPrefix+key,
  })
}

const removeStorageSync = (key) => {
  wx.removeStorageSync({
    key: keyPrefix+key,
  })
}

const getStorage = (key) => {
  const data = wx.getStorageSync(keyPrefix+key);
  if (data===null || data===undefined) return null;
  let expireTime = data.expireTime;
  if (expireTime===null || expireTime===undefined) return data.data;
  if (new Date().getTime()>expireTime) { // 已过期
    removeStorage(keyPrefix+key);
    return null;
  } else {
    return data.data;
  }
}

const expireStorageTime = (key, expireMilliseconds) => {
  const data = wx.getStorageSync(keyPrefix+key);
  if (data===null || data===undefined) return;
  setStorageTime(key, data.data, expireMilliseconds)
}

/**
 * 延长某个key的缓存时间
 */
const expireStorageTimeSync = (key, expireMilliseconds) => {
  const data = wx.getStorageSync(keyPrefix+key);
  if (data===null || data===undefined) return;
  setStorageTimeSync(key, data.data, expireMilliseconds)
}

module.exports = {
  setStorage,
  setStorageSync,
  removeStorage,
  removeStorageSync,
  getStorage,
  expireStorageTime,
  expireStorageTimeSync
}

