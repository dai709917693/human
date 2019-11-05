import { Injectable } from '../decorators/ioc.decorators'
@Injectable()
export class DrawingCanvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  offsetCanvas: HTMLCanvasElement
  offsetCtx: CanvasRenderingContext2D
  height: number = 500
  width: number = 500
  datas: any[] = []
  currentSelectData: any = null
  /**
   * @description: 点击位置相对与数据原始位置长度
   */
  _relPosX = 0
  _relPosY = 0
  /**
   * @description: 交互事件
   */
  interaction: Interaction = new Interaction()
  constructor() {
    this.offsetCanvas = document.createElement('CANVAS') as HTMLCanvasElement
    this.offsetCtx = this.offsetCanvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    this.offsetCanvas.height = this.height
    this.offsetCanvas.width = this.width

    this.canvas = document.createElement('CANVAS') as HTMLCanvasElement
    this.canvas.height = this.height
    this.canvas.width = this.width
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.bindingEvents()
  }
  resize() {
    let parentNode = this.canvas.parentNode
    if (parentNode) {
      this.width = (parentNode as HTMLElement).offsetWidth
      this.height = (parentNode as HTMLElement).offsetHeight
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.offsetCanvas.width = this.width
      this.offsetCanvas.height = this.height
    }
  }
  clear() {
    this.offsetCtx.clearRect(
      0,
      0,
      this.offsetCanvas.width,
      this.offsetCanvas.height
    )
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  /**
   * @description: 重绘
   */
  repaint() {
    window.requestAnimationFrame(this.requestAnimationFrameRepaint.bind(this))
  }
  requestAnimationFrameRepaint() {
    this.clear()
    this.datas.forEach(data => {
      data.draw()
    })
    this.ctx.drawImage(this.offsetCanvas, 0, 0)
  }
  addData(data: any) {
    this.datas.push(data)
  }
  bindingEvents() {
    this.interaction.addElement(this.canvas)
    this.interaction.addEventCallback('mousedown', this.mousedown.bind(this))
    this.interaction.addEventCallback('mousemove', this.mousemove.bind(this))
    this.interaction.addEventCallback('mouseup', this.mouseup.bind(this))
    this.interaction.addEventCallback('click', this.click.bind(this))
  }
  click(e: MouseEvent) {
    console.log('click', e, this.datas.length)
  }
  mousedown(e: MouseEvent) {
    this.datas.forEach(data => {
      if (data.checkBoundary(e.offsetX, e.offsetY)) {
        this.currentSelectData = data
        if (this.currentSelectData) {
          this._relPosX = e.offsetX - this.currentSelectData.x
          this._relPosY = e.offsetY - this.currentSelectData.y
        }
      }
    })
  }
  mousemove(e: MouseEvent) {
    if (this.currentSelectData) {
      this.currentSelectData.setPosition({
        x: e.offsetX - this._relPosX,
        y: e.offsetY - this._relPosY
      })
      this.repaint()
    }
  }
  mouseup() {
    this.currentSelectData = null
  }
}
class Interaction {
  moveStartTime: number = 0
  isClickMode: boolean = true
  eventsCallbackList: { [eventName: string]: Function[] } = {}
  element: HTMLElement | null = null
  constructor(element?: HTMLElement) {
    if (element) {
      this.addElement(element)
    }
  }
  addElement(element: HTMLElement) {
    if (this.element) {
      element.removeEventListener('mousedown', this.mousedown.bind(this))
      element.removeEventListener('click', this.click.bind(this))
    }
    this.element = element
    element.addEventListener('mousedown', this.mousedown.bind(this))
    element.addEventListener('click', this.click.bind(this))
  }
  /**
   * @description: 添加事件回调
   */
  addEventCallback(type: string, callback: Function) {
    if (!this.eventsCallbackList[type]) {
      this.eventsCallbackList[type] = []
    }
    this.eventsCallbackList[type].push(callback)
  }
  /**
   * @description: 执行事件回调
   */
  execEventsCallback(type: string, e: any) {
    if (this.eventsCallbackList[type]) {
      this.eventsCallbackList[type].forEach(callback => {
        callback(e)
      })
    }
  }
  click(e: MouseEvent) {
    if (this.isClickMode) {
      this.execEventsCallback('click', e)
    }
  }
  mousedown(e: MouseEvent) {
    this.isClickMode = true
    this.moveStartTime = new Date().getTime()
    document.onmousemove = this.mousemove.bind(this)
    document.onmouseup = this.mouseup.bind(this)
    this.execEventsCallback('mousedown', e)
  }
  mousemove(e: MouseEvent) {
    if (e.target === this.element) {
      this.execEventsCallback('mousemove', e)
    }
  }
  mouseup(e: MouseEvent) {
    let moveEndTime = new Date().getTime()
    if (moveEndTime - this.moveStartTime > 300) {
      this.isClickMode = false
    } else {
      this.isClickMode = true
    }
    document.onmousemove = null
    document.onmouseup = null
    this.execEventsCallback('mouseup', e)
  }
}
