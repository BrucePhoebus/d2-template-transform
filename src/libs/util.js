import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
	cookies,
	db,
	log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
	const processTitle = process.env.VUE_APP_TITLE || '绩效管理社会调查产权大数据系统'
	window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
	let a = document.createElement('a')
	a.setAttribute('href', url)
	a.setAttribute('target', '_blank')
	a.setAttribute('id', 'd2admin-link-temp')
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * 获取指定的URL参数值
 * 参数：keyName URL参数
 * 调用方法:getParam("name")
 * 返回值: value
 */
util.getParamValue = function(keyName) {
	let paramValue = '';
	if (window.location.href.indexOf("?")  && window.location.href.indexOf("=") > 1) {
		let params = unescape(window.location.href).substring(0, window.location.href.length).split("?");
		let i = 0;
		params = params[1].split('&');
		while (i < params.length) {
			if (keyName === params[i].split('=')[0]) {
				paramValue = params[i].split('=')[1];
			}
			i++;
		}
	}
	return paramValue;
}

/**
 * @description 截取字符串：混合中英文
 * @param {String} str 要截取的字符串
 * @param {Integer} len 截取的字节长度：中文2字节 英文1字节
 */
util.subString = function(str, len) {
	// 正在表达式匹配中文
	var reg = /[^\x00-\xff]/g;
	
	// len：字符长度
	let strLen = str.replace(reg, "xx").length;
	/*
	* 直接返回空字符串的情况
	* 	字符串为空
	* 	截取end大于start
	* 	截取的初始位置超过字符串长度
	* */
	if (!str) {
		return '';
	}
	
	if (strLen <= len) {
		return str;
	}
	
	// 假设指定长度内都是中文
	var m = Math.floor(len/2);
	for (var i = m, j = str.length; i < j; i++) {
		// 当截取字符串字节长度满足指定的字节长度
		if (str.substring(0, i).replace(reg, "xx").length >= len) {
			return str.substring(0, i);
		}
	}
	return str;
}

/**
 * @description 截取字符串：混合中英文
 * @param {String} str 要截取的字符串
 * @param {Integer} start 截取的开始位置
 * @param {Integer} end 截取的截止位置
 */
util.subStr = function(str, start, end) {
	// 正在表达式匹配中文
	var reg = /[^\x00-\xff]/g;
	
	// len：字符长度
	let len = str.replace(reg, "xx").length;
	/*
	* 直接返回空字符串的情况
	* 	字符串为空
	* 	截取end大于start
	* 	截取的初始位置超过字符串长度
	* */
	if (!str || start >= end || len <= start) {
		return '';
	}
	
	// 如果截取的字符长度过长，则直接截取最大长度
	end = len <= end ? len : end;
	
	// 假设指定长度内都是中文
	var m = Math.floor(end/2);
	for (var i = m, j = str.length; i < j; i++) {
		// 当截取字符串字节长度满足指定的字节长度
		if (str.substring(start, i).replace(reg, "xx").length >= end) {
			return str.substring(start, i);
		}
	}
	return str;
}

/**
 * @description 下载blob二进制表格文件
 * @param {String} data 二进制文件流
 * @param {String} fileName 含后缀文件名
 * @param {String} suffix 文件后缀 默认xls类型
 */
util.downloadBlobFile = function (data, fileName, type) {
	let blob = new Blob([data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
	type = type ? type : '.xls';
	fileName = fileName ? fileName : new Date().getTime() + type;
	if (typeof window.chrome !== 'undefined') {
		// Chrome version
		let link = document.createElement('a');
		let URL = window.URL || window.webkitURL;
		link.href = URL.createObjectURL(blob);
		link.download = fileName;
		link.click();
	} else if (typeof window.navigator.msSaveBlob !== 'undefined') {
		// IE version
		blob = new Blob([data], { type: 'application/force-download' });
		window.navigator.msSaveBlob(blob, fileName);
	} else {
		// Firefox version
		let file = new File([data], fileName, { type: 'application/force-download' });
		window.open(URL.createObjectURL(file));
	}
}

export default util
