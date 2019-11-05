import { Base2d, Base2dInterface } from './Base.shape'
import { Inject } from '../decorators/ioc.decorators'
import { DrawingCanvas } from '../canvas/DrawingCanvas.canvas'

export class Line extends Base2d implements Base2dInterface {
  /**
   * @description: 末点与起始点的差值
   */  
  endOffsetStartX: number = 0
  endOffsetStartY: number = 0
  constructor(@Inject() public drawingCanvas: DrawingCanvas) {
    super(drawingCanvas)
  }

  draw() {
    let endX = this.endOffsetStartX + this.x
    let endY = this.endOffsetStartY + this.y
    this.ctx.lineWidth = this.lineWidth
    if (this.styleAttr.strokeStyle) {
      this.ctx.strokeStyle = this.styleAttr.strokeStyle
    }
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(endX, endY)
    this.ctx.stroke()
  }

  checkBoundary(x: number, y: number): boolean {
    let endX = this.endOffsetStartX + this.x
    let endY = this.endOffsetStartY + this.y
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(endX, endY)
    return this.ctx.isPointInStroke(x, y)
  }
}
