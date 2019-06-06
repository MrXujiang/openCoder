import multer from 'koa-multer'
import {resolve} from 'path'
import fs from 'fs'

const root = resolve(__dirname, '../public/uploads')

//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, root)
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  })
  //加载配置
  export const upload = multer({ storage: storage })

  // 删除文件
  export const delFile = async (path) => {
    return await fs.unlink(`${root}/${path}`);
  }

// 删除文件夹
function deleteFolder(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}