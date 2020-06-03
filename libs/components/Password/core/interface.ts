interface Props{
    width?: string | number,
    height?: string | number,
    placeholder?: string,
    //用于该value改变时的回调函数, 参数分别表示
    //1. 该input框dom结点
    //2. 该input框value值
    onChange?: { bivarianceHack(target: any, value: string): void }["bivarianceHack"],
    //是否显示密码切换可见的图标
    controls?: boolean
}
export {Props};