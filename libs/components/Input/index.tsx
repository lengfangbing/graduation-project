import React, { useState, useEffect, FormEvent, useRef } from "react";
import { InputContainerStyle, InputStyle } from './style';
import { Props } from './core/interface';
import { debounce, isString, isRegExp } from '../service';
function Input({
	width = 150,
	height = 24,
	value,
	onChange,
	verify,
	controls = true,
	type = 'text',
	disabled = false,
	placeholder = ''
}: Props) {
	const outerWidth = isString(width) ? width : width + "px";
	const outerHeight = isString(height) ? height : height + "px";
	const [textValue, setTextValue] = useState(value || '');
	const [isError, setIsError] = useState(isRegExp(verify) && !verify.test(value) ? true : false);
	const ref = useRef();
	const textChangeFunc = function (e: FormEvent<HTMLInputElement>) {
		if(disabled){
			return;
		}
		const target = e.target;
		// @ts-ignore
		const value = target.value;
		setTextValue(value);
		if (onChange) {
			if (isRegExp(verify)) {
				const testResult = verify.test(value);
				debounce(onChange, 300, [target, value, testResult])();
				isError == testResult && setIsError(!testResult);
			}
			else {
				debounce(onChange, 300, [target, value])();
			}
		}

	}
	const clearInputValueFunc = function () {
		const target = ref.current;
		setTextValue('');
		if (onChange) {
			if (isRegExp(verify)) {
				const testResult = verify.test('');
				debounce(onChange, 300, [target, '', testResult])();
				isError == testResult && setIsError(!testResult);
			}
			else {
				debounce(onChange, 300, [target, ''])();
			}
		}
	}
	return <InputContainerStyle>
		<InputStyle
			ref={ref}
			value={textValue}
			error={isError}
			onInput={textChangeFunc}
			onChange={() => {}}
			placeholder={placeholder}
			outerWidth={outerWidth}
			outerHeight={outerHeight} 
			disabled={disabled} />
		{textValue.length > 0 && controls && !disabled ?
			<svg
				onClick={clearInputValueFunc}
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2027"
				width="16"
				height="16"><path d="M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384m0-832C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64" fill="#8a8a8a" p-id="2028"></path><path d="M665.376 313.376L512 466.752l-153.376-153.376-45.248 45.248L466.752 512l-153.376 153.376 45.248 45.248L512 557.248l153.376 153.376 45.248-45.248L557.248 512l153.376-153.376z" fill="#8a8a8a" p-id="2029"></path></svg> :
			void 0}
	</InputContainerStyle>
}

export default Input;
