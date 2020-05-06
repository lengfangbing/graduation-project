import styled from "styled-components";
const controlsHeight = 10;
const CarouselContainerStyle = styled.div`
    position: relative;
    width: ${(props: {outerWidth, outerHeight}) => props.outerWidth};
    height: ${(props: {outerWidth, outerHeight}) => props.outerHeight};
    overflow: hidden;
`;
const CarouselWrapperStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props: {length, style?}) => props.length + "00%"};
    height: 100%;
    transition: transform .3s linear 0s;
    & > *{
        width: ${(props: {length, style?}) => (100/props.length).toFixed(0) + "%"};
        height: 100%;
    }
`;
const ControlsStyle = styled.div`
    width: ${(props: {width}) => props.width};
    height: ${controlsHeight * 2}px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 5%;
`;
const ControlsItemStyle = styled.span`
    display: inline-block;
    width: 25px;
    height: ${controlsHeight}px;
    cursor: pointer;
    background-color: ${(props: {checked}) => props.checked ? 'rgba(238, 238, 238, .9)' : 'rgb(195, 195, 195)'};
    margin: 5px;
    transition: background-color .2s linear 0s;
    &:hover{
        background-color: rgba(238, 238, 238, .9);
    }
`;

export {CarouselContainerStyle, CarouselWrapperStyle, ControlsStyle, ControlsItemStyle}
