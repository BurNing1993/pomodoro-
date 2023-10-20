import mitt from 'mitt'

type Events = {
  addTask: void
}

const emitter = mitt<Events>() // inferred as Emitter<Events>

export default emitter
