/**
 * @description: 画图模式对应方法名
 */
let shapeModeToDrawFunName: { [shapeMode: string]: string } = {}
export function shapeMode(mode: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    shapeModeToDrawFunName[mode] = propertyKey
  }
}
export function getDrawByShapeMode(mode: string): string {
  return shapeModeToDrawFunName[mode]
}
