import React, { useState, useEffect, useRef } from 'react';
import { SelectProps, OptionProps } from './core/interface';
import {
	SelectContainerStyle,
	IconStyle,
	SelectHeaderStyle,
	SelectedItemStyle,
	SelectItemsContainerStyle,
	SelectItemStyle
} from './style';
import { throttle, isString } from "../service";
function Select({
	width = 140,
	height = 24,
	onChange,
	children
}: SelectProps) {
	const [opened, setOpened] = useState(false);
	const [iconStyle, setIconStyle] = useState('');
	const [selectedValue, setSelectedValue] = useState('');
	const [selectedKey, setSelectedKey] = useState('');
	const ref = useRef();
	const innerWidth = isString(width) ? `calc(${width})` : `${width}px`;
	const innerHeight = isString(height) ? `calc(${height})` : `${height}px`;
	const openItems = function () {
		throttle(setOpened, 300, [!opened])();
	};
	const closeItems = function () {
		opened ? setOpened(false) : void 0
	};
	const setStyle = function (opened: Boolean) {
		setIconStyle(
			`rotate3d(0, 0, 1, ${opened ? '-180deg' : '0deg'})`
		)
	};
	const selectedOneItem = function (item) {
		setSelectedValue(item.value);
		setSelectedKey(item.key);
		onChange.call(this, [ref.current, item]);
	};
	useEffect(() => {
		closeItems();
	}, [selectedValue]);
	useEffect(() => {
		setStyle(opened);
	}, [opened]);
	return <SelectContainerStyle
		width={innerWidth}
		height={innerHeight}
		onBlur={closeItems}
	>
		<SelectHeaderStyle
			onClick={openItems}>
			<SelectedItemStyle
				ref={ref}
				onClick={(e) => e.stopPropagation()}>
				{selectedValue}
			</SelectedItemStyle>
			<IconStyle
				style={{ transform: iconStyle }}
				viewBox="64 64 896 896" focusable="false" width="1em" height="1em">
				<path
					d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
			</IconStyle>
		</SelectHeaderStyle>
		<SelectItemsContainerStyle opened={opened} height={`${Math.min(children.length * 30, 200)}px`}>
			{children.map((item, index) => {
				return <Option selected={item.key === selectedKey} key={item.key} item={item} onClick={selectedOneItem} />
			})}
		</SelectItemsContainerStyle>
	</SelectContainerStyle>
}

function Option(props: OptionProps) {
	return <SelectItemStyle isSelectedKey={props.selected} onClick={props.onClick.bind(this, props.item)}>
		{props.item.value}
	</SelectItemStyle>
}
export default Select;
