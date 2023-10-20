export interface Task {
  id: number
  title: string
  type: 'tomato' | 'foucs'
  foucs: number
  rest: number
  // timer: 'alwaysOnTop' | 'tray' 
}
