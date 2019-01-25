Vue.directive('clickoutside', {
  bind: function(el, binding, vnode) {
    function documentHandler(e) {
      // 判断点击的区域是否是指令所在的元素内部，如果是，就跳出函数，不往下继续执行
      // contains 方法是用来判断元素 A 是否包含子元素 B，包含返回 true
      if (el.contains(e.target)) {
        return false;
      }
      // 判断的是当前的指令 v-clickoutside 有没有写表达式，在该自定义指令中，表达式应该是一个函数
      // binding.value() 就是用来执行当前上下文 methods 中指定的函数的
      if (binding.expression) {
        binding.value(e);
      }
    }
    // 这样是为了在 unbind 钩子里移除对 document 的 click 事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind: function(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
});
