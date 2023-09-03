export type EventMessage = {
  target: string
  nick: string

  type: 'message' | 'action'
  content: string
  self: boolean

  mask: string
  server: string
}
