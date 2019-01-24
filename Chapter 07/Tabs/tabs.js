Vue.component('tabs', {
  template: '\
  <div class="tabs">\
    <div class="tabs-bar">\
      <!-- 标签页标题，这里要用 v-for -->\
      <div\
        :class="tabCls(item)"\
        v-for="(item, index) in navList"\
        @click="handleChange(index)">\
        {{ item.label }}\
      </div>\
    </div>\
    <div class="tabs-content">\
      <!-- 这里的 slot 就是嵌套的 pane -->\
      <slot></slot>\
    </div>\
  </div>',
  props: {
    // 这里的 value 是为了可以使用 v-model
    value: {
      type: [String, Number]
    }
  },
  data: function() {
    return {
      // 因为不能直接修改 value，所以复制一份自己维护
      currentValue: this.value,
      // 用于渲染 tabs 的标题
      navList: []
    };
  },
  methods: {
    tabCls: function(item) {
      return [
        'tabs-tab',
        {
          // 给当前选中的 tab 加一个 class
          'tabs-tab-active': item.name === this.currentValue
        }
      ];
    },
    // 点击 tab 标题时触发
    handleChange: function(index) {
      let nav = this.navList[index];
      let name = nav.name;
      // 改变当前选中的 tab，并触发下面的 watch
      this.currentValue = name;
      // 更新 value
      this.$emit('input', name);
      // 触发一个自定义事件，供父级使用
      this.$emit('on-click', name);
    },
    getTabs() {
      // 通过遍历子组件，得到所有的 pane 组件
      return this.$children.filter(function(item) {
        return item.$options.name === 'pane';
      });
    },
    updateNav() {
      this.navList = [];
      // 设置对 this 的引用，在 function 回调里，this 指向的并不是 Vue 实例
      let _this = this;

      this.getTabs().forEach(function(pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index
        });
        // 如果没有给 pane 设置 name，默认设置它的索引
        if (!pane.name) pane.name = index;
        // 设置当前选中的 tab 的索引
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index;
          }
        }
      });

      this.updateStatus();
    },
    updateStatus() {
      let tabs = this.getTabs();
      let _this = this;
      // 显示当前选中的 tab 对应的 pane 组件，隐藏没有选中的
      tabs.forEach(function(tab) {
        return tab.show = tab.name === _this.currentValue;
      });
    }
  },
  watch: {
    value: function(val) {
      this.currentValue = val;
    },
    currentValue: function() {
      // 在当前选中的 tab 发生变化时，更新 pane 的显示状态
      this.updateStatus();
    }
  }
});
