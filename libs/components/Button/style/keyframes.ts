import {keyframes} from 'styled-components';
/**
 * 定义旋转动画
 */
const LoadingKeyframe = keyframes`
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(359deg);
    }
`;
/**
 * 定义点击动画
 */
// const ClickedKeyframe = keyframes`
//     from{
//         transform: scale(1);
//     }
//     50%{
//         transform: scale(1.1);
//     }
//     to{
//         transform: scale(1.1);
//         border: 1px transparent solid;
//     }
// `;
export {LoadingKeyframe};