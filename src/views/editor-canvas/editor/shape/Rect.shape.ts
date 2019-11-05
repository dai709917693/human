import { Base2d, Base2dInterface } from './Base.shape'
import { Inject } from '../decorators/ioc.decorators'
import { DrawingCanvas } from '../canvas/DrawingCanvas.canvas'

import _ from 'lodash'
export class Rect extends Base2d implements Base2dInterface {
  constructor(@Inject() public drawingCanvas: DrawingCanvas) {
    super(drawingCanvas)
  }
  
  get outerX(): number {
    if (this.styleAttr.strokeStyle) {
      return this.x - this.lineWidth / 2
    } else {
      return this.x
    }
  }
  get innerX(): number {
    if (this.styleAttr.strokeStyle) {
      return this.x + this.lineWidth / 2
    } else {
      return this.x
    }
  }
  get outerY(): number {
    if (this.styleAttr.strokeStyle) {
      return this.y - this.lineWidth / 2
    } else {
      return this.y
    }
  }
  get innerY(): number {
    if (this.styleAttr.strokeStyle) {
      return this.y + this.lineWidth / 2
    } else {
      return this.y
    }
  }
  draw() {
    if (this.styleAttr.fillStyle) {
      this.ctx.fillStyle = this.styleAttr.fillStyle
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    if (this.lineWidth) {
      this.ctx.lineWidth = this.lineWidth
    }
    if (this.styleAttr.strokeStyle) {
      this.ctx.strokeStyle = this.styleAttr.strokeStyle
      this.ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
  checkBoundary(x: number, y: number) {
    let x1_outer = this.outerX
    let x2_outer = x1_outer + this.width + 2 * this.lineWidth
    let y1_outer = this.outerY
    let y2_outer = y1_outer + this.height + 2 * this.lineWidth

    let x1_inner = this.innerX
    let x2_inner = x1_inner + this.width - 2 * this.lineWidth
    let y1_inner = this.innerY
    let y2_inner = y1_inner + this.height - 2 * this.lineWidth

    let inside = x > x1_outer && x < x2_outer && y > y1_outer && y < y2_outer
    let gtInner = x > x1_inner && x < x2_inner && y > y1_inner && y < y2_inner
    if (this.styleAttr.fillStyle) {
      return inside
    } else if (this.styleAttr.strokeStyle) {
      return !gtInner && inside
    } else {
      return false
    }
  }
}
