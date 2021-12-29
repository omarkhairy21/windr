import { IconType } from 'react-icons'

export interface Site {
  id: string
  name: string
  content: any
  contentHTML: string
  isDrafted: boolean
  owner: Owner
  slug: string
  subDomain: string
  customDomain: string
  published_at: Date
}

export interface Owner {
  id: string
  username: string
  email: string
  provider: string
  password: string
  resetPasswordToken: string
  confirmationToken: string
  confirmed: boolean
  blocked: boolean
  role: string
  profile: string
  sites: string[]
  created_by: string
  updated_by: string
}

export interface IEditorButton {
  name: string
  icon: IconType
  executeEditorCommand: () => any
}

export interface IEditorDrawerButton extends IEditorButton {
  closeDrawerOnSelectCallback?: () => void
}

export interface IEditorBubbleButton extends IEditorButton {
  styleOnBubbleMenu?: object
}
