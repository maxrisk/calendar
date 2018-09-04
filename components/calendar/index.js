Component({

  properties: {
    monthCount: {
      type: Number,
      value: 3,
      description: '显示几个月份'
    },
    leastDays: {
      type: Number,
      value: 0,
      description: '最小日期间隔'
    },
    timeArr: {
      type: Array,
      value: [0, 0],
      description: '数组的两个元素分别为选中的开始毫秒时间戮和结束开始毫秒时间戮'
    }
  },

  data: {
    curYear: '',
    curMonth: '',
    curDay: '',
    calendars: []
  },

  attached: function () {
    this._init();
  },

  methods: {
    _calendarFactory: function (year, month) {
      let daysCount = this._getDays(year, month);
      let startWeek = this._getWeek(year, month);
      let days = Array.from(new Array(daysCount), (val, index) => {
        return {
          text
          : index + 1,
          timestamp: new Date(`${year}/${month}/${index + 1}`).getTime()
        };
      });
      let placeholders = Array.from(new Array(startWeek), (val, index) => index + 1);
      
      return {
        year,
        month,
        days,
        startWeek,
        placeholders
      }
    },

    _createCalendars: function () {
      let calendars = [];
      let currentYear = this.data.curYear;
      let startMonth = this.data.curMonth + 1;

      for (let i = 0; i < this.data.monthCount; i++) {
        (startMonth > 12) && (startMonth = 1) && (currentYear += 1);

        calendars.push(this._calendarFactory(currentYear, startMonth));
        
        startMonth += 1;
      }

      this.setData({ calendars })
    },

    _init: function () {
      let date = new Date();

      this.setData({
        curYear: parseInt(date.getFullYear(), 10),
        curMonth: parseInt(date.getMonth(), 10),
        curDay: parseInt(date.getDate(), 10)
      });

      this._createCalendars();
    },

    _getDays: function(curYear, curMonth) {
      let day = new Date(curYear, curMonth, 0);
      
      return day.getDate();
    },

    _getWeek: function(year, month) {
      let date = new Date();

      date.setYear(year);
      date.setMonth(month - 1);
      date.setDate(1);

      return date.getDay();
    },

    _chooseDay: function (e) {
      const timestamp = e.currentTarget.dataset.timestamp;
      const disabled = e.currentTarget.dataset.disabled;

      if (disabled) return false;

      if (this.data.timeArr[0] && this.data.timeArr[1]) {
        this.setData({
          'timeArr[0]': timestamp,
          'timeArr[1]': 0
        })
      } else if (!this.data.timeArr[0] || this.data.timeArr[0] > timestamp) {
        this.setData({
          'timeArr[0]': timestamp
        })
      } else if (timestamp < this.data.timeArr[0]) {
        this.setData({
          'timeArr[0]': timestamp
        })
      } else {
        let diffDay = ((timestamp - this.data.timeArr[0]) / 864e5) + 1;

        if (diffDay < this.data.leastDays) {  // 设置的时间小于规定的间隔
          wx.showToast({
            title: `最少选择 ${this.data.leastDays} 天`,
            icon: 'none'
          })
          return false;
        }
        this.setData({
          'timeArr[1]': timestamp
        })
      }

      this._notify();
    },
    
    _notify: function () {
      let count = 0;

      if (this.data.timeArr[1]) {
        count = (this.data.timeArr[1] - this.data.timeArr[0]) / 864e5 + 1;
      } else if (this.data.timeArr[0] && !this.data.timeArr[1]) {
        count = 1;
      } else {
        count = 0;
      }

      this.triggerEvent('calendarchange', {
        days: this.data.timeArr,
        count
      });
    },

    clearChoose: function () {
      this.setData({
        timeArr: [0, 0]
      })
      this._notify();
    }
  }
})
