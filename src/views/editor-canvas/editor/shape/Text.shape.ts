import _ from 'lodash'
import { Base2d, Base2dInterface } from './Base.shape'
import { Inject } from '../decorators/ioc.decorators'
import { DrawingCanvas } from '../canvas/DrawingCanvas.canvas'
import { Binding } from '../util/binding'
type textAlign = 'center' | 'end' | 'left' | 'right' | 'start'
type textBaseline =
  | 'alphabetic'
  | 'top'
  | 'hanging'
  | 'middle'
  | 'ideographic'
  | 'bottom'
interface fontAttr {
  [index: string]: any
  font: string
  content: string
  textAlign: textAlign
  textBaseline: textBaseline
}
export class Text extends Base2d implements Base2dInterface {
  fontAttr: fontAttr = {
    font: '2em Arial',
    textAlign: 'start',
    textBaseline: 'hanging',
    content: '文本'
  }

  constructor(@Inject() public drawingCanvas: DrawingCanvas) {
    super(drawingCanvas)
    new Binding(this.fontAttr, drawingCanvas.repaint.bind(drawingCanvas))
  }

  setFont(options: any) {
    _.forEach(options, (value, key) => {
      this.fontAttr[key] = value
    })
  }
  draw(ctx?: CanvasRenderingContext2D, x?: number, y?: number) {
    let renderCtx = ctx ? ctx : this.ctx
    let doneX = typeof x !== 'undefined' ? x : this.x
    let doneY = typeof y !== 'undefined' ? y : this.y
    let cont = this.fontAttr.content
    renderCtx.font = this.fontAttr.font
    // this.ctx.textAlign = this.fontAttr.textAlign
    renderCtx.textBaseline = 'hanging'
    if (this.styleAttr.strokeStyle) {
      renderCtx.strokeStyle = this.styleAttr.strokeStyle
      renderCtx.strokeText(cont, doneX, doneY)
    }
    if (this.styleAttr.fillStyle) {
      renderCtx.fillStyle = this.styleAttr.fillStyle
      renderCtx.fillText(cont, doneX, doneY)
    }
  }
  checkBoundary(x: number, y: number): boolean {
    let measureText = this.ctx.measureText(this.fontAttr.content)
    let width = measureText.width
    let height = width / this.fontAttr.content.length
    let doneX = x - this.x
    let doneY = y - this.y
    if (doneX < 0 || doneY < 0 || doneX > width || doneY > height) {
      return false
    }

    let testCanvas = document.createElement('CANVAS') as HTMLCanvasElement
    let testCtx = testCanvas.getContext('2d') as CanvasRenderingContext2D
    testCanvas.height = height
    testCanvas.width = width
    this.draw(testCtx, 0, 0)
    var pixel = testCtx.getImageData(doneX, doneY, 1, 1)
    // 判断透明度不为0
    if (pixel.data[3] != 0) {
      return true
    }
    return false
  }
}
