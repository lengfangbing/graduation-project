import { MouseEventHandler } from "react";

interface ButtonProps {
    disabled?: boolean | string
    content?: any
    onClick?: MouseEventHandler<HTMLButtonElement>
    loading?: boolean
    children?: any
    //点击间隔
    timer?: number | string
    type?: string;
}

export {ButtonProps}