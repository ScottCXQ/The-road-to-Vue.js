let Time = {
  // 获取当前时间戳
  getUnix: function() {
    let oDate = new Date();
    return oDate.getTime();
  },
  // 获取今天 0 点 0 分 0 秒的时间戳
  getTodayUnix: function() {
    let oDate = new Date();
    oDate.setHours(0);
    oDate.setMinutes(0);
    oDate.setSeconds(0);
    oDate.setMilliseconds(0);
    return oDate.getTime();
  },
  // 获取今年 1 月 1 日 0 点 0 分 0 秒的时间戳
  getYearUnix: function() {
    let oDate = new Date();
    oDate.setMonth(0);
    oDate.setDate(1);
    oDate.setHours(0);
    oDate.setMinutes(0);
    oDate.setSeconds(0);
    oDate.setMilliseconds(0);
    return oDate.getTime();
  },
  // 获取标准年月日
  getLastDate: function(time) {
    let oDate = new Date(time);
    let month = oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1;
    let day = oDate.getDate() < 10 ? '0' + oDate.getDate() : oDate.getDate();
    return oDate.getFullYear() + '-' + month + '-' + day;
  },
  // 转换时间
  // 这里的时间戳都是毫秒级的
  getFormatTime: function(timestamp) {
    let oNow = this.getUnix();                // 当前时间戳
    let oToday = this.getTodayUnix();         // 今天 0 点时间戳
    let oYear = this.getYearUnix();           // 今年 0 点时间戳
    let timer = (oNow - timestamp) / 1000;    // 转换为秒级时间戳
    let sTip = '';

    if (timer <= 0) {
      sTip = '刚刚';
    } else if (Math.floor(timer/60) <= 0) {
      sTip = '刚刚';
    } else if (timer < 3600) {
      sTip = Math.floor(timer/60) + '分钟前';
    } else if (timer >= 3600 && (timestamp - oToday >= 0)) {
      sTip = Math.floor(timer/3600) + '小时前';
    } else if (timer/86400 <= 31) {
      sTip = Math.ceil(timer/86400) + '天前';
    } else {
      sTip = this.getLastDate(timestamp);
    }
    return sTip;
  }
};

Vue.directive('time', {
  bind: function(el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value);
    el.__timer__ = setInterval(function() {
      el.innerHTML = Time.getFormatTime(binding.value);
    }, 60000);
  },
  unbind: function(el, binding) {
    clearInterval(el.__timer__);
    delete el.__timer__;
  }
});
