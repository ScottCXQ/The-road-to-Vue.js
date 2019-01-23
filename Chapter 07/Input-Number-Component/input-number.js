// 验证输入的是不是数字
function isValueNumber(value) {
  return (/(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
  template: '\
  <div class="input-number">\
    <input \
      type="text"\
      :value="currentValue"\
      @change="handleChange"/>\
      <button \
        @click="handleDown"\
        :disabled="currentValue <= min">-</button>\
      <button \
        @click="handleUp"\
        :disabled="currentValue >= max">+</button>\
  </div>',
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      currentValue: this.value
    }
  },
  // 这里需要监听两个变量，value 和 currentValue
  // 监听 value 是要知晓从父组件修改了 value
  // 监听 currentValue 是为了当 currentValue 改变时，更新 value
  watch: {
    currentValue: function(val) {
      this.$emit('input', val);
      this.$emit('on-change', val);
    },
    value: function(val) {
      this.updateValue(val);
    }
  },
  methods: {
    updateValue: function(val) {
      if (val > this.max) val = this.max;
      if (val < this.min) val = this.min;
      this.currentValue = val;
    },
    handleDown: function() {
      if (this.currentValue <= this.min) return;
      this.currentValue -= 1;
    },
    handleUp: function() {
      if (this.currentValue >= this.max) return;
      this.currentValue += 1;
    },
    handleChange: function(event) {
      let val = event.target.value.trim();
      let max = this.max;
      let min = this.min;

      if (isValueNumber(val)) {
        val = Number(val);
        this.currentValue = val;

        if (this.currentValue >= max) {
          this.currentValue = max;
        } else if (this.currentValue <= min) {
          this.currentValue = min;
        }
      } else {
        event.target.value = this.currentValue;
      }
    }
  },
//   在第一次初始化时，也对 value 进行过滤
  mounted: function() {
    this.updateValue(this.value);
  }
});
