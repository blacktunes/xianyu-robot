export interface CQMessage {
  type: string
  data: null | {
    [key: string]: string
  }
}

export type Message = string | CQMessage | CQMessage[]

export interface NodeMessage {
  type: 'node'
  data: {
    [key: string]: Message
  }
}
