import mitt from 'mitt'

type Events = {
  addEvent: void
}

const emitter = mitt<Events>() // inferred as Emitter<Events>

export default emitter
