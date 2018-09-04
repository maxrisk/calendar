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
