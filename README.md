# 📅 小程序日历组件

## 概述
这是一款简单易用的小程序日历组件，实现了选择开始时间和结束时间的功能。克隆 [maxrisk/calendar](https://github.com/maxrisk/calendar) 之后可在微信开发者工具中打开查看示例。

---
![demo](https://www.minivote.cn/storage/images/demo.gif)

## 示例
### index.wxml
```xml
<calendar least-days="{{ leastDays }}" bind:calendarchange="onCalendarChange" />
```

### index.json
```json
{
  "usingComponents": {
    "calendar": "/components/calendar/index"
  }
}
```

### index.js
```javascript
import { formatTime } from '../../utils/util.js';

Page({

  data: {
    leastDays: 3
  },

  onCalendarChange: function (e) {
    const startDate = new Date(e.detail.days[0]);
    const endDate = e.detail.days[1] ? new Date(e.detail.days[1]) : '';

    console.log(`选中 ${formatTime(startDate)} ~ ${endDate ? formatTime(endDate) : ''}，共 ${e.detail.count} 天`);
  }
})
```
## 组件属性

参数        | 类型   | 说明 | 默认值
----------- | ------ | ---- | :---:
month-count | Number | 显示几个月份 | 2
least-days  | Number | 至少选择多少天 | 0
time-arr    | Array  | 开始时间和结束开始时间（时间戮），没选中时为 0 | [0, 0]

## 组件事件
事件名称       | 说明 | 回调参数
-------------- | ---- | --------
calendarchange | 在选择日期时触发 | event

