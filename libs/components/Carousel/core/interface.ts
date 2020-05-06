interface Props {
    //图片列表
    images?: string[] | HTMLImageElement[],
    //宽度
    width?: number | string,
    //高度
    height?: number | string,
    //间隔
    period?: number,
    //自动轮播
    autoplay?: boolean,
    //控制项
    controls?: boolean,
    //图片列表的第二种传递方式
    children?: any[],
    //切换图片的点击间隔(为了防止短时间内多次点击切换消耗性能)
    clickPeriod?: number
}
export {Props}