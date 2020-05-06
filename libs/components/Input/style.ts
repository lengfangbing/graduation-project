import styled, { css, keyframes } from "styled-components";

const CommonStyle = css`
    outline: none;
    box-sizing: border-box;
    padding: 0 14px 0 4px;
    border-radius: 3px;
    transition: border .3s linear 0s, box-shadow .3s linear 0s, background-color .3s linear 0s;
`;
const InputContainerStyle = styled.section`
    width: fit-content;
    position: relative;
    &>svg{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: opacity .3s linear 0s;
        opacity: .6;
        cursor: pointer;
    }
    &>svg:hover{
        opacity: 1;
    }
`;
const stylesMap = {
    error: css`
        width: ${(props: { outerWidth, outerHeight }) => props.outerWidth};
        height: ${(props: { outerWidth, outerHeight }) => props.outerHeight};
        border: 1px solid rgb(242, 38, 9);
        box-shadow: 0 0 0 transparent;
        &:hover{
            border: 1px solid rgb(255, 0, 0);
        }
        &:focus{
            border: 1px solid rgb(255, 0, 0);
            box-shadow: 0 0 8px rgba(200, 34, 30, .7);
        }
    `,
    basic: css`
        width: ${(props: { outerWidth, outerHeight }) => props.outerWidth};
        height: ${(props: { outerWidth, outerHeight }) => props.outerHeight};
        border: 1px solid rgb(129, 139, 132);
        box-shadow: 0 0 0 transparent;
        &:hover{
            border: 1px solid rgb(63, 72, 250);
        }
        &:focus{
            border: 1px solid rgb(63, 72, 250);
            box-shadow: 0 0 8px rgba(124, 102, 215, .8);
        }
    `
}
const InputStyle = styled.input.attrs({
    type: 'text'
})`
    ${CommonStyle};
    ${(props: any) => props.error ? stylesMap['error'] : stylesMap['basic']}
`;

export { InputContainerStyle, InputStyle }
