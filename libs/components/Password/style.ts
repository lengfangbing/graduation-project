import styled, {css} from 'styled-components';

const commonStyle = css`
    outline: none;
    box-sizing: border-box;
    padding: 0 14px 0 4px;
    border-radius: 3px;
    transition: box-shadow .3s linear 0s, border .3s linear 0s;
`;
const PasswordContainerStyle = styled.section`
    width: fit-content;
    position: relative;
`;
const PasswordStyle = styled.input.attrs(props => {
    return {
        type: props.type
    }
})`
    ${commonStyle}
    width: ${(props: {outerWidth, outerHeight}) => props.outerWidth};
    height: ${(props: {outerWidth, outerHeight}) => props.outerHeight};
    border: 1px solid rgb(129, 139, 132);
    box-shadow: 0 0 0 transparent;
    &:hover{
        border: 1px solid rgb(63, 72, 250);
    }
    &:focus{
        border: 1ox solid rgb(63, 72, 250);
        box-shadow: 0 0 8px rgba(124, 102, 215, .8);
    }
`;
const ControlsStyle = styled.span`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: .5;
    transition: opacity .3s linear 0s;
    cursor: pointer;
    &:hover{
        opacity: 1;
    }
`;
export {PasswordContainerStyle, PasswordStyle, ControlsStyle};
