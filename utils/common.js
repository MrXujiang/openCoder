/*
 * @Author: Mr Jiang.Xu 
 * @Date: 2019-06-06 11:23:05 
 * @Last Modified by: Mr Jiang.Xu
 * @Last Modified time: 2019-06-29 22:33:52
 */

/* eslint-disable */
 
/**
 * 识别ie--浅识别
 */
export const isIe = () => {
    let explorer = window.navigator.userAgent;
        //判断是否为IE浏览器
    if (explorer.indexOf("MSIE") >= 0) {
        return true;
    }else {
        return false
    }
}

/**
 * 颜色转换16进制转rgba
 * @param {String} hex 
 * @param {Number} opacity 
 */
export function hex2Rgba(hex, opacity) {
	if(!hex) hex = "#2c4dae";
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + (opacity || "1") + ")";
}

/**
 * 常用字段类型验证
 * @param {String} type
 * @param {表单输入值} value
 */
export const check = (type,value) => {
	let reg;
	switch (type){
        case "证件号码":
		case "身份证号码":
            // reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
			reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
        case "移动电话":
		case "手机号码":
            // reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			reg=/^1[3456789]\d{9}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		case "家庭电话":
			reg=/^0\d{2,3}-?\d{7,8}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		case "电子邮箱":
			reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		case "邮箱":
            // reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		default:
			return true;
			break;
	}
}

// 去除html标签
export const htmlSafeStr = (str) => {
    return str.replace(/<[^>]+>/g, "")
}

/* 获取url参数 */
export const getQueryString = () => {
    let qs = location.href.split('?')[1] || '',
        args = {},
        items = qs.length ? qs.split("&") : [];
        items.forEach((item,i) => {
            let arr = item.split('='),
                name = decodeURIComponent(arr[0]),
                value = decodeURIComponent(arr[1]);
                name.length && (args[name] = value)
        })
    return args;
}

/* 解析url参数 */
export const toParams = (parmas) => {
    if(params){
        let query = [];
        for(let key in params){
            query.push(`${key}=${params[key]}`)
        }
        return `${query.join('&')}`
    }else{
        return ''
    }
}

export const toArray = (data) => {
    return Array.isArray(data) ? data : [data]
}

/**
 * 动态跳转路由
 * @param {String} url 
 * @param {Object} params 
 */
export const toPage = (url, params) => {
    if(params){
        let query = [];
        for(let key in params){
            query.push(`${key}=${params[key]}`)
        }
        window.location.href = `./index.html#/${url}?${query.join('&')}`;
    }else{
        window.location.href = `./index.html#/${url}`;
    }
}

/**
 * 指定字符串 溢出显示省略号
 * @param {String} str
 * @param {Number} num
 */
export const getSubStringSum = (str = "", num = 1) => {
    let newStr;

    if(str){
        str = str + '';
        if (str.trim().length > num ) {
            newStr = str.trim().substring(0, num) + "...";
        } else {
            newStr = str.trim();
        }
    }else{
        newStr = ''
    }

    return newStr;
}



