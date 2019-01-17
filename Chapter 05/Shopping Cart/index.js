const app = new Vue({
  el: '#app',
  data: {
    list: [
      {
        id: 1,
        name: 'iPhone Xs Max',
        price: 12988,
        count: 3
      },
      {
        id: 2,
        name: 'iPad Pro',
        price: 7988,
        count: 2
      },
      {
        id: 3,
        name: 'MacBook Pro',
        price: 21488,
        count: 1
      }
    ]
  },
  computed: {
    // 商品总价，计算属性
    totalPrice: function() {
      let total = 0;
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        total += item.price * item.count;
      }

      // 每隔三位数加一个逗号
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
    }
  },
  methods: {
    // 控制商品数量减少的方法
    handleReduce: function(index) {
      if (this.list[index].count === 1) return;
      this.list[index].count--;
    },
    // 控制商品数量增加的方法
    handleAdd: function(index) {
      this.list[index].count++;
    },
    // 移除对应商品的方法
    handleRemove: function(index) {
      this.list.splice(index, 1);
    }
  }
});
