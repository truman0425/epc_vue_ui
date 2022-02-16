const initPanelsLayout = [
  { x: 0, y: 0, w: 1, h: 7, i: 8, name: '待我处理',static: false },
  { x: 1, y: 0, w: 1, h: 7, i: 0, name: '我的任务' },
  { x:2, y: 0, w: 1, h: 7, i: 1, name: '项目示警' },
  { x: 0, y: 7, w: 3, h: 16, i: 3, name: '项目机会' },
  { x: 0, y: 23, w: 3, h: 13, i: 6, name: '项目控单' },
]

//   <todo-item v-if="item.name === '待我处理'" :panelSetIcon="true"></todo-item>
// <task-item v-if="item.name === '我的任务'" :panelSetIcon="true"></task-item>
// <warn-item v-if="item.name === '项目示警'" :panelSetIcon="true"></warn-item>
// <chance-item v-if="item.name === '项目机会'" :panelSetIcon="true"></chance-item>
// <topfive-item v-if="item.name === '项目控单'" :panelSetIcon="true"></topfive-item>

export { initPanelsLayout }
