import { Editor } from '@tiptap/core'
import { IEditorButton } from '@types'
import { MdFormatQuote } from 'react-icons/md'
import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiHeading,
  RiAlignLeft,
  RiAlignRight,
  RiAlignCenter,
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiListOrdered,
  RiListUnordered,
  RiLink,
  RiCodeSSlashFill,
} from 'react-icons/ri'
import { EditorButtonEnums } from './config'

export const getEditorButtonList = (editor: Editor): IEditorButton[] => [
  {
    name: EditorButtonEnums.Header,
    icon: RiHeading,
    executeEditorCommand: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    name: EditorButtonEnums.Header1,
    icon: RiH1,
    executeEditorCommand: () => {
      console.log('Clicked', editor)
      return editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    name: EditorButtonEnums.Header2,
    icon: RiH2,
    executeEditorCommand: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    name: EditorButtonEnums.Header3,
    icon: RiH3,
    executeEditorCommand: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    name: EditorButtonEnums.Header4,
    icon: RiH4,
    executeEditorCommand: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },
  {
    name: EditorButtonEnums.Header5,
    icon: RiH5,
    executeEditorCommand: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
  },
  {
    name: EditorButtonEnums.Header6,
    icon: RiH6,
    executeEditorCommand: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
  },
  {
    name: EditorButtonEnums.Bold,
    icon: RiBold,
    executeEditorCommand: () => editor.chain().focus().toggleBold().run(),
  },
  {
    name: EditorButtonEnums.Italic,
    icon: RiItalic,
    executeEditorCommand: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    name: EditorButtonEnums.Underline,
    icon: RiUnderline,
    executeEditorCommand: () => editor.chain().focus().toggleUnderline().run(),
  },
  {
    name: EditorButtonEnums.Strikethrough,
    icon: RiStrikethrough,
    executeEditorCommand: () => editor.chain().focus().toggleStrike().run(),
  },
  {
    name: EditorButtonEnums.Blockquote,
    icon: MdFormatQuote,
    executeEditorCommand: () => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    name: EditorButtonEnums.AlignLeft,
    icon: RiAlignLeft,
    executeEditorCommand: () => editor.chain().focus().setTextAlign('left').run(),
  },
  {
    name: EditorButtonEnums.AlignCenter,
    icon: RiAlignCenter,
    executeEditorCommand: () => editor.chain().focus().setTextAlign('center').run(),
  },
  {
    name: EditorButtonEnums.AlignRight,
    icon: RiAlignRight,
    executeEditorCommand: () => editor.chain().focus().setTextAlign('right').run(),
  },
  {
    name: EditorButtonEnums.OrderedList,
    icon: RiListOrdered,
    executeEditorCommand: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    name: EditorButtonEnums.UnorderedList,
    icon: RiListUnordered,
    executeEditorCommand: () => editor.chain().focus().toggleBulletList().run(),
  },
  // {
  //   name: EditorButtonEnums.Link,
  //   icon: RiLink,
  //   executeEditorCommand: url =>
  //     editor
  //       .chain()
  //       .focus()
  //       .toggleLink({ href: url || '' })
  //       .run(),
  // },
  {
    name: EditorButtonEnums.Code,
    icon: RiCodeSSlashFill,
    executeEditorCommand: () => editor.chain().focus().toggleCode().run(),
  },
]
