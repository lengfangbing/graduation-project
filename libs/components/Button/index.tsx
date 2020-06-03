import React, { useEffect, useState } from "react";
import { BasicButton, clearInlineStyle, appendInlineStyle } from "./style/style";
import { ButtonProps } from './core/interface';

/**
 * @param {Object} props - 这个button的可配置选项
 * @param {String} [props.type] - 这个button的类型, 目前支持默认(不填)和取消(cancel)
 * @param {Boolean} [props.disabled] - 这个button是否可用
 * @param {Boolean | Number} [props.loading] - 这个button是否正在加载数据, 加载和不加载将会使用不同的样式
 * @param {String | Number} [props.timer] - 这个button两次点击的间隔, 支持数字和字符串, 字符串是全数字的, 单位是毫秒
 * @param {Function} [props.onClick] - 这个button点击后的回调函数, 除了点击事件的参数event, 不要传入其他的参数
 */
function Button(props: ButtonProps) {
	const [className, setClassName] = useState('');
	const [isClickFreeze, setIsClickFreeze] = useState(false);
	const timer = props.timer ? +props.timer : void 0;
	function handleClickButton(e: React.MouseEvent<HTMLButtonElement>) {
		if (timer) {
			if (isClickFreeze) return;
			setIsClickFreeze(true);
		}
		//先执行自己的一些逻辑
		appendInlineStyle();
		setClassName('owner-button-click');
		//在执行props传递的函数
		props.onClick && props.onClick(e);
	}
	//控制className改变的effect
	useEffect(() => {
		if (className == '') return;
		setTimeout(() => {
			setClassName('');
			clearInlineStyle();
		}, 500);
	}, [className]);
	//控制isClickFreeze的effect
	useEffect(() => {
		if (isClickFreeze) {
			setTimeout(() => {
				setIsClickFreeze(false);
			}, timer);
		}
	}, [isClickFreeze]);
	// @ts-ignore
	return <BasicButton type={props.type}
		className={className}
		disabled={!!props.disabled}
		loading={props.loading}
		onClick={props.loading ? void 0 : handleClickButton}>{props.children || props.content}</BasicButton>
}

export default Button;