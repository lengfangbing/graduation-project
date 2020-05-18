interface Props{
    //宽度
    width?: number | string,
    //高度
    height?: number | string,
    //类型
    type?: 'text' | 'password',
    //是否不可用
    disabled?: boolean,
    //默认值
    value?: string,
    //提示
    placeholder?: string,
    //用于该value值改变时的回调函数, 参数分别表示
    //该dom结点, 该input框的value值, 是否通过该正则验证(只有传入verify时才会返回boolean类型, 否则为void 0)
    onChange?: { bivarianceHack(target: any, value: string, valid?: boolean): void }["bivarianceHack"],
    //用于验证的正则
    verify?: RegExp,
    //清空控制项
    controls?: boolean
}

export {Props}