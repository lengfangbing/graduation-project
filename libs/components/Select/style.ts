import styled from 'styled-components';

const SelectContainerStyle = styled.section`
    ${(props: {width, height}) => `
        width: ${props.width};height: ${props.height};line-height: ${props.height}
    `}
    position: relative;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid rgba(179, 180, 185, .7);
    transition: border-color .2s linear 0s;
    &:hover{
        border-color: rgb(179, 180, 185);
    }
`;
const SelectHeaderStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;
const SelectedItemStyle = styled.span`
    height: 100%;
    cursor: default;
    overflow: hidden;
`;
const IconStyle = styled.svg`
    cursor: pointer;
    transition: transform .3s linear 0s;
`;
const SelectItemsContainerStyle = styled.div`
    position: absolute;
    max-height: 200px;
    height: ${(props: { opened, height }) => props.opened ? props.height : '0'};
    opacity: ${(props: { opened, height }) => props.opened ? '1' : '0'};
    overflow-y: auto;
    top: calc(100% + 1px);
    width: 100%;
    left: 0;
    box-sizing: border-box;
    transition: height .3s linear 0s, opacity .3s linear 0s;
    transform: translate3d(0, 0, 0);
    border-radius: 6px;
    box-shadow: 0 2px 2px rgb(105, 105, 105);
    border-top: none;
    z-index: 100;
    background: rgb(240, 240, 240);
`;
const SelectItemStyle = styled.div`
    border-bottom: 1px solid rgb(200, 200, 200);
    padding: 2px 5px;
    background: ${(props: {isSelectedKey}) => props.isSelectedKey ? 'rgb(199, 199, 199)' : 'transparent'};
    height: 30px;
    font-size: 17px;
    box-sizing: border-box;
    cursor: pointer;
    transition: background .2s linear 0s;
    &:hover{
        background: rgb(199, 199, 199);
    }
    &:last-child{
        border-bottom: none;
    }
`;
export {
    SelectContainerStyle,
    SelectHeaderStyle,
    SelectedItemStyle,
    IconStyle,
    SelectItemsContainerStyle,
    SelectItemStyle
};
