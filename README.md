# LoadMap

地图SDK加载器，支持腾讯地图和百度地图，可用于vue和react项目。

> 百度地图可选择使用[react-baidu-maps](https://www.npmjs.com/package/react-baidu-maps)，[vue-baidu-map](https://www.npmjs.com/package/vue-baidu-map)

### 安装

```bash
npm install load-map --save
```

### 使用

```js
import LoadMap from 'load-map';
LoadMap.load({
    mapKey: 'xxxxx', // 你申请的key
    version： '2.exp', // 地图版本，
    url: 'https://map.qq.com/api/js', // 地图SDK的URL，不包含查询部分
    query: {}, // 加载地图SDK，额外的URL查询部分(百度地图有type: webgl)
}).then(sdk => {
    // qqmapEl是腾讯地图的容器
    // myOptions 腾讯地图的配置
    new sdk.maps.Map(qqmapEl, myOptions);
})
```

### 参数

#### load方法，

加载地图SDK，返回Promise，成功回调里面参数为SDK

- mapKey：

  【String】 必填，地图平台申请的key

- version：

  【String】 地图版本，腾讯地图(例：`2.exp`)，百度地图(例：`1.0`)

- url：

  【String】 地图SDK的URL，腾讯地图(例：`'https://map.qq.com/api/js'`)默认值，百度地图(例：`'https://api.map.baidu.com/api'`)

- query:

  【Object】加载地图SDK，额外的URL查询部分，腾讯地图不需要配置，百度地图JavaScript API GL版`{type: 'webgl'}`