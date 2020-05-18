interface SelectProps{
    width?: string | number,
    height?: string | number,
    //选择项目改变时的回调函数
    onChange?: { bivarianceHack(target: any, value: any[]): void }["bivarianceHack"],
    //选择项
    children?: any[]
}
interface OptionProps{
    selected: boolean
    item: {value, key}
    onClick?: Function
}
export {SelectProps, OptionProps};
