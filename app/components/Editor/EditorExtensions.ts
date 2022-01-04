import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Focus from '@tiptap/extension-focus'
import Underline from '@tiptap/extension-underline'
import { generateHTML } from '@tiptap/html'
import Placeholder from '@tiptap/extension-placeholder'

export const EditorExtensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    placeholder: 'Type anything..',
    showOnlyCurrent: true,
  }),
  Focus.configure({
    className: 'has-focus',
  }),
  Underline,
  Image,
]

export function getHTML(content: JSON) {
  return generateHTML(content, [StarterKit, TextAlign, Underline, Image])
}
