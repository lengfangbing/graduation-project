import styled, {css} from "styled-components";
import { LoadingKeyframe } from './keyframes';
import { ButtonProps } from '../core/interface';

//同样的样式代码, common抽离出来
const commonStyle = css`
    min-width: 55px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    outline: none;
    border-radius: 2px;
    border: transparent 1px solid;
    box-shadow: 0 0 2px grey;
    padding: 3px 10px;
    transition: all .2s linear 0s;
    cursor: default;
    position: relative;
`;
/** 普通的样式代码 */
const basicStyle = css`
    ${commonStyle}
    cursor: pointer;
    background-color: rgb(29, 134, 240);
    color: rgb(255, 255, 255);
    &:hover{
        border: #1890ff 1px solid;
        background-color: rgba(29, 134, 240, 0.9);
        box-shadow: 0 0 2px transparent;
    }
`;

const loadingStyle = css`
    ${commonStyle}
    background-color: rgba(29, 134, 240, 0.9);
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::before{
        border: 1px rgb(255, 255, 255) dashed;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        content: '';
        margin-right: 5px;
        animation: ${LoadingKeyframe} 1s linear infinite;
    }
`;
/** 用于存放中间件的样式数组 */
const typeStyleArray = {
    'cancel': css`
        ${commonStyle}
        cursor: pointer;
        color: rgb(86, 94, 102);
        background-color: rgb(250, 251, 252);
        &:hover{
            border: #1890ff 1px solid;
            color: rgb(29, 134, 240);
            box-shadow: 0 0 2px transparent;
        }
    `
};

const disabledStyleArray = {
    'disabled': css`
        ${commonStyle}
        color: rgb(173, 184, 192); 
        background-color: rgb(231, 238, 243);
    `
}
/** 所有的props都要从这个方法返回该有的样式 */
function ReturnSpecifyStyle(props: ButtonProps) {
    const { type, disabled, loading } = props;
    //先判断优先级最高的, 再往下依次判断
    if (!!disabled) {
        return disabledStyleArray['disabled'];
    }
    if(!!loading){
        return loadingStyle;
    }
    const _type = type ? typeStyleArray[type] : void 0;
    if (_type) {
        return _type;
    }
    return basicStyle;
}
const BasicButton = styled.button`
     ${(props: ButtonProps) => ReturnSpecifyStyle(props)}
`;
/**
 * 定义点击按钮的动画
 */
const ClickedKeyframe = `
    @keyframes Clicked{
        from{
            border: rgba(29, 134, 240, 0.5) 1px solid;
            transform: scale(1);
        }
        30%{
            border: rgba(29, 134, 240, 0.3) 1px solid;
            transform: scale(1.1);
        }
        70%{
            border: rgba(29, 134, 240, 0.1) 1px solid;
            transform: scale(1.1);
        }
        to{
            border: transparent 1px solid;
            transform: scale(1.1);
        }
    }
    .owner-button-click{
        position: relative;
    }
    .owner-button-click::after{
        content: '';
        position: absolute;
        left: -1px;
        top: -1px;
        width: 100%;
        height: 100%;
        border-radius: 2px;
        box-shadow: 0 0 2px rgba(29, 134, 240, 0.1);
        border: rgba(29, 134, 240, 0.5) 1px solid;
        animation: Clicked 0.5s linear 0s 1;
    }
`;
/**
 * 添加样式, 在body中添加style标签
 */
const style = document.createElement('style');
//@ts-ignore
document.body.appendChild(style);
/**
 * 清除内联style标签的方法
 */
function clearInlineStyle() {
    style.innerHTML = '';
}
/**
 * 设置内联style标签的方法
 */
function appendInlineStyle() {
    style.innerHTML = ClickedKeyframe;
}

export { BasicButton, appendInlineStyle, clearInlineStyle };

// /**
//  * @description 将驼峰命名的字符串转为-连字符相连的小写字符串
//  * @param {String} str 传入的字符串(驼峰命名)
//  * @return {String} 返回的-连字符相连的小写字符串
//  */
// function parseStringWithSignalToLowerCase(str: string){
//     const reg = /([a-z])([A-Z])/;
//     return str.replace(reg, (a: string, b: string, c: string): string => {
//         return b+'-'+c.toLowerCase();
//     })
// }
// /**
//  * @description 配置自己想要的样式
//  * @param {Object} style 想要配置的私有样式(支持驼峰命名的属性)
//  * @return {null}
//  */
// function setOwnStyleInDefaultButton(style: object){
//     if(!style) return;
//     let ConfigStr = '';
//     for(let i in style){
//         if(style.hasOwnProperty(i)) ConfigStr += parseStringWithSignalToLowerCase(i)+':'+style[i]+';'+'\n';
//     }
//     //TODO with ConfigStr
// }