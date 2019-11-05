<!--
 * @description: ZRADMIN
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-08-05 14:51:40
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-08-12 14:59:15
 -->
<script>
export default {
  name: 'render-component',
  props: {
    /**
     * @description 传入的render函数
     */
    renderFunction: {
      type: Function,
      required: true
    },
    /**
     * @description 传入的scope
     */
    scope: {
      default: null
    }
  },
  render (h) {
    return this.handleRender(h, this.scope)
  },
  methods: {
    handleRender (h, scope) {
      return this.renderFunction(h, scope)
    }
  }
}
</script>
