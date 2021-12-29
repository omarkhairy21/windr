export const EditorButtonEnums = {
  Header: 'Header',
  Header1: 'Header1',
  Header2: 'Header2',
  Header3: 'Header3',
  Header4: 'Header4',
  Header5: 'Header5',
  Header6: 'Header6',
  Bold: 'Bold',
  Italic: 'Italic',
  Underline: 'Underline',
  Strikethrough: 'Strikethrough',
  Blockquote: 'Blockquote',
  AlignLeft: 'AlignLeft',
  AlignCenter: 'AlignCenter',
  AlignRight: 'AlignRight',
  OrderedList: 'OrderedList',
  UnorderedList: 'UnorderedList',
  Link: 'Link',
  Image: 'Image',
  Video: 'Video',
}

export const Bubble_Menu_Style = {
  content: `""`,
  w: 0,
  h: 0,
  borderLeft: 'solid transparent',
  borderLeftWidth: 16,
  borderRight: 'solid transparent',
  borderRightWidth: 16,
  borderTop: 'solid',
  borderTopWidth: 16,
  borderTopColor: 'gray.300',
  pos: 'absolute',
  bottom: '-16px',
  left: '50%',
  transform: 'translateX(-50%)',
}

export const Buttons_Used_In_BubbleMenu = [
  EditorButtonEnums.Header,
  EditorButtonEnums.Bold,
  EditorButtonEnums.Italic,
  EditorButtonEnums.Underline,
  EditorButtonEnums.AlignLeft,
  EditorButtonEnums.AlignCenter,
  EditorButtonEnums.AlignRight,
  EditorButtonEnums.Blockquote,
  EditorButtonEnums.OrderedList,
  EditorButtonEnums.UnorderedList,
]

export const Buttons_Used_In_FixedMenu = [
  EditorButtonEnums.Header,
  EditorButtonEnums.Bold,
  EditorButtonEnums.Italic,
  EditorButtonEnums.Underline,
  EditorButtonEnums.AlignLeft,
  EditorButtonEnums.AlignCenter,
  EditorButtonEnums.AlignRight,
]
