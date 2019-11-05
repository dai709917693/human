import _ from 'lodash'
class Dep {
  static target: Watcher | null = null
  subs: Watcher[] = []
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
class Watcher {
  public value: any
  constructor(
    public data: any,
    public prop: string,
    public callback: Function
  ) {
    this.register()
  }
  update() {
    const value = this.data[this.prop]
    const oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.callback(value)
    }
  }
  /**
   * @description: 注册watcher到Dep容器
   */
  register() {
    Dep.target = this //储存订阅器
    const value = this.data[this.prop]
    Dep.target = null
    this.value = value
  }
}

export class Binding {
  constructor(public data: any, public callback: Function) {
    this.observer(data)
    this.addWatcher(data)
  }
  addWatcher(data: any) {
    _.forEach(data, (value, key) => {
      if (data && typeof data == 'object') {
        this.addWatcher(value)
      }
      new Watcher(data, key, this.callback)
    })
  }
  defineReactive(data: object, key: string, value: any) {
    //递归调用，监听所有属性
    this.observer(value)
    var dep = new Dep()
    Object.defineProperty(data, key, {
      get: function() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return value
      },
      set: function(newVal) {
        if (value !== newVal) {
          value = newVal
          dep.notify() //通知订阅器
        }
      }
    })
  }
  observer(data: any) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
}
