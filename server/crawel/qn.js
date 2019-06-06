const qiniu = require('qiniu')
// 生成唯一ID的库
const nanoid = require('nanoid')
const { resolve } = require('path')
const { bucket, img, AK, SK } = require('../config').qiniu

const mac = new qiniu.auth.digest.Mac(AK, SK)

const options = {
    scope: bucket
  }
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

var localFile = resolve(__dirname, './qn.js');
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key='js/upload.js';
// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});

