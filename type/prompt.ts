import { UserType } from './user'

export type PromptType = {
  _id?: string
  creator?: UserType
  prompt: string
  tag: string
}