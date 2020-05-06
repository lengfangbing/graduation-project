import React, { useState, useEffect } from "react";
import { CarouselContainerStyle, CarouselWrapperStyle, ControlsStyle, ControlsItemStyle } from "../style";
import { isNumber, isString, isArray, isObject, throttle } from '../../service';
import { Props } from "./interface";
/**
 *
 * @param {Object} props
 * @return React.Component
 */

let timer = null;
function Carousel({
	images,
	width = "100%",
	height = "100%",
	period = 3000,
	autoplay = true,
	controls = true,
	children,
	clickPeriod = 500
}: Props) {
	const outerWidth = isString(width) ? width : width + "px";
	const outerHeight = isString(height) ? height : height + "px";
	const [onShowIndex, setOnShowIndex] = useState(0);
	const oneBaseUnit = +(100 / children.length).toFixed(0);
	const translateStyle = `-${onShowIndex * oneBaseUnit}%`;
	const [shouldPlay, setShouldPlay] = useState(true);
	const [startPlay, setStartPlay] = useState(autoplay);
	const maxItemIndex = children.length - 1;

	const setTimer = function () {
		timer = setTimeout(() => {
			const nextIndex = onShowIndex == maxItemIndex ? 0 : onShowIndex + 1;
			setOnShowIndex(nextIndex);
		}, period);
	};
	const clearTimer = function () {
		timer && clearTimeout(timer);
	};
	useEffect(() => {
		setTimer();
		return () => clearTimer();
	}, [onShowIndex]);
	const setShowedIndexFunc = function (index: number) {
		setOnShowIndex(index);
	};
	const controlItemClick = function (i) {
		throttle(setShowedIndexFunc, +clickPeriod < 500 ? 500 : clickPeriod, [i])()
	}
	return children.length ?
		<CarouselContainerStyle outerWidth={outerWidth} outerHeight={outerHeight}>
			<CarouselWrapperStyle style={{ transform: `translateX(${translateStyle})` }} length={children.length}>
				{children}
			</CarouselWrapperStyle>
			{controls ?
				<ControlsStyle width={outerWidth}>
					{children.map((v: any, i: number) => {
						return <ControlsItemStyle
							key={v + i}
							checked={i == onShowIndex}
							onClick={controlItemClick.bind(this, i)} />
					})}
				</ControlsStyle> :
				null}
		</CarouselContainerStyle> :
		null;
}

export default Carousel;
