import { Inject, classFactory } from './decorators/ioc.decorators'
import { Rect } from './shape/Rect.shape'
import { shapeMode, getDrawByShapeMode } from './decorators/shapeMode.decorators'
import { Base2d } from './shape/Base.shape'
import { DrawingCanvas } from './canvas/DrawingCanvas.canvas'
import { Line } from './shape/Line.shape'
import { Text } from './shape/Text.shape'
class Editor {
  drawShapeMode: string | null = null
  positionX: number = 0
  positionY: number = 0
  currentDrawData: Base2d | null = null
  constructor(@Inject() public drawingCanvas: DrawingCanvas) {
    this.addDrawInteractionEvent()
  }
  get canvas() {
    return this.drawingCanvas.canvas
  }
  addDrawInteractionEvent() {
    this.drawingCanvas.interaction.addEventCallback(
      'mousedown',
      this.drawMousedown.bind(this)
    )
    this.drawingCanvas.interaction.addEventCallback(
      'mousemove',
      this.drawMousemove.bind(this)
    )
    this.drawingCanvas.interaction.addEventCallback(
      'mouseup',
      this.drawMouseup.bind(this)
    )
  }

  drawMousedown(e: MouseEvent) {
    if (this.drawingCanvas.currentSelectData) {
      return
    }
    this.positionX = e.offsetX
    this.positionY = e.offsetY
  }
  drawMousemove(e: MouseEvent) {
    if (this.drawingCanvas.currentSelectData) {
      return
    }
    if (this.drawShapeMode) {
      let drawFunName = getDrawByShapeMode(this.drawShapeMode)
      ;(this as any)[drawFunName](e.offsetX, e.offsetY)
      this.drawingCanvas.repaint()
    }
  }
  drawMouseup() {
    if (this.drawingCanvas.currentSelectData) {
      return
    }
    this.currentDrawData = null
    this.positionX = 0
    this.positionY = 0
  }
  exportPNG() {
    // this.canvas.toBlob(blob => {})
    // this.canvas.toDataURL()
  }
  @shapeMode('rect')
  drawRect(endX: number, endY: number) {
    if (!this.currentDrawData) {
      this.currentDrawData = classFactory(Rect)
      this.currentDrawData.setStyle({ strokeStyle: 'red' })
      this.drawingCanvas.addData(this.currentDrawData)
    }
    let startX = this.positionX
    let startY = this.positionY
    if (endX < this.positionX) {
      startX = endX
    }
    if (endY < this.positionY) {
      startY = endY
    }

    let width = Math.abs(endX - this.positionX)
    let height = Math.abs(endY - this.positionY)
    this.currentDrawData.setPosition({ x: startX, y: startY })
    this.currentDrawData.setSize({ width, height })
  }
  setDrawRectMode() {
    this.drawShapeMode = 'rect'
  }

  @shapeMode('line')
  drawLine(endX: number, endY: number) {
    if (!this.currentDrawData) {
      this.currentDrawData = classFactory(Line)
      this.currentDrawData.setStyle({ strokeStyle: 'red', lineWidth: 5 })
      this.currentDrawData.setPosition({ x: endX, y: endY })
      this.drawingCanvas.addData(this.currentDrawData)
    }
    (this.currentDrawData as Line).endOffsetStartX =
      endX - this.currentDrawData.x
    ;(this.currentDrawData as Line).endOffsetStartY =
      endY - this.currentDrawData.y
  }
  setDrawLineMode() {
    this.drawShapeMode = 'line'
  }

  @shapeMode('text')
  drawText(endX: number, endY: number) {
    if (!this.currentDrawData) {
      this.currentDrawData = classFactory(Text)
      this.currentDrawData.setStyle({ fillStyle: 'red' })
      this.currentDrawData.setPosition({ x: endX, y: endY })
      this.drawingCanvas.addData(this.currentDrawData)
    }
  }
  setDrawTextMode() {
    this.drawShapeMode = 'text'
  }
}
export const editor = classFactory(Editor)
