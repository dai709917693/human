import _ from 'lodash'
import { DrawingCanvas } from '../canvas/DrawingCanvas.canvas'
import { Binding } from '../util/binding'
export interface styleAttribute {
  [index: string]: any
  width: number
  height: number
  position: { x: number; y: number; z: number }
  fillStyle: string | CanvasGradient | CanvasPattern | null
  strokeStyle: string | CanvasGradient | CanvasPattern | null
  lineWidth: number | null
}
export interface Base2dInterface {
  checkBoundary(x: number, y: number): boolean
  draw(): void
}
export class Base2d {
  styleAttr: styleAttribute
  constructor(public drawingCanvas: DrawingCanvas) {
    this.styleAttr = {
      width: 100,
      height: 100,
      position: { x: 0, y: 0, z: 0 },
      fillStyle: null,
      strokeStyle: null,
      lineWidth: null
    }
    new Binding(this.styleAttr, drawingCanvas.repaint.bind(drawingCanvas))
  }
  get ctx() {
    return this.drawingCanvas.offsetCtx
  }
  get x(): number {
    return this.styleAttr.position.x
  }
  get y(): number {
    return this.styleAttr.position.y
  }
  get width(): number {
    return this.styleAttr.width
  }
  get height(): number {
    return this.styleAttr.height
  }
  get lineWidth(): number {
    if (this.styleAttr.strokeStyle) {
      if (this.styleAttr.lineWidth !== null) {
        return this.styleAttr.lineWidth
      } else {
        return 1
      }
    } else {
      return 0
    }
  }
  setStyle(options: any) {
    _.forEach(options, (value, key) => {
      if (key === 'position') {
        this.setPosition(value)
      } else {
        this.styleAttr[key] = value
      }
    })
  }
  setPosition(position: { x: number; y: number }) {
    this.styleAttr.position.x = position.x
    this.styleAttr.position.y = position.y
  }
  setSize(size: { width: number; height: number }) {
    this.setStyle(size)
  }
}
