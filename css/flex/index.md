# 容器的属性
## flex-direction: 
row row-reverse column column-reverse

## justify-content: 
flex-start flex-end center space-between space-around

## align-items: 
flex-start: 交叉轴的起点对齐
flex-end: 交叉轴的终点对齐
center: 交叉轴的中点对齐
baseline: 项目的第一行文字的基线对齐
stretch: 默认值，如果项目未设置高度或者设为auto，将占满整个容器的高度

## align-content: 
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。

定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用


## flex-wrap: 
nowrap(不换行) wrap(换行，第一行在上方) wrap-reverse(第一行在下方)
定义一条轴线排不下，如何换行

## flex-flow: 
<flex-direction> || <flex-wrap>

flex-direction和flex-wrap属性的简写形式，默认是row nowrap

# 项目的属性

## order
order: <integer>
属性定义项目的排列顺序，数值越小，排列越靠前，默认为0

## flex
flex: <flex-grow> <flex-shrink> <flex-basis>

flex是flex-grow、flex-shrink、flex-basis的简写，默认值为0 1 auto。后两个属性可选
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## flex-grow
属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## flex-shrink
属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

## flex-basis
属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

## align-self
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

auto | flex-start | flex-end | center | baseline | stretch






