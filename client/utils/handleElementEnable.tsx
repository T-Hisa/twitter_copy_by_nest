export const handleElementUnable = (element: HTMLElement) => {
  const originClassName: string = element.className
  element.className = `${originClassName} disabled`
}

export const handleElementEnable = (element: HTMLElement) => {
  const originClassName = element.className
  const modifiedClassName = originClassName.replace(/\sdisabled/, '')
  element.className = modifiedClassName
}