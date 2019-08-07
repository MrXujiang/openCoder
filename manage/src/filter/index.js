/*
 * @Author: Mr Jiang.Xu 
 * @Date: 2019-06-17 22:03:02 
 * @Last Modified by: Mr Jiang.Xu
 * @Last Modified time: 2019-06-17 22:06:17
 */

/**
 * 时间标签化
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), '分')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' 时')
    } else {
        return pluralize(~~(between / 86400), ' 天')
    }
}

/**
 * 数字格式化 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
  
/**
 * 首字母大写
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}