import { UpdateMessage } from "./UpdateMessage"
import { InitMessage } from "./InitMessage"

export interface Message {
  key: string
  value: UpdateMessage | InitMessage
}
