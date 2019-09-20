# typescript 编写 vue

[vue-property-decorator 插件](https://www.npmjs.com/package/vue-property-decorator)

# .vue 文件

### 遍历生成主题

```scss
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {

  }
}
</style>
```

### 引用变量编写属性

```scss
.side__left__menus {
  background-color: map-get($map: $theme, $key: 'sideLeft-background');
}
```

# 主题配置

### 主题配置文件路径

src/assets/style/theme
