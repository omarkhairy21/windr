import { EditorExtensions } from './EditorExtensions'
import {
  Box,
  HStack,
  VStack,
  Icon,
  useDisclosure,
  useMediaQuery,
  SimpleGrid,
  Button,
  IconButton,
  useMenu,
  Menu,
  MenuList,
  MenuItem,
  Portal,
} from '@chakra-ui/react'
import { EditorContent, BubbleMenu, FloatingMenu, useEditor, Content } from '@tiptap/react'
import { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { Bubble_Menu_Style, Buttons_Used_In_BubbleMenu, Buttons_Used_In_FixedMenu } from './config'
import { getEditorButtonList } from './EditorButtonList'
import { MobileMenuDrawer } from './MobileMenuDrawer'
import { ImageButton, ImageMenuItem } from './ImageButton'
import { SetImageModal } from './SetImageModal'
import { debounce } from 'lodash'
import { AddIcon } from '@chakra-ui/icons'

interface IEditorProps {
  saveContentOnEditorUpdate: (content: string) => void
  siteContent: Content
  siteId: string
}

export function TipTapEditor({ siteContent, saveContentOnEditorUpdate, siteId }: IEditorProps) {
  const editor = useEditor({
    extensions: EditorExtensions,
    content: siteContent,
  })
  const { isOpen: isDrawerOpen, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onCloseModal } = useDisclosure()
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose, menuRef } = useMenu()
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const [imageSrc, setImageSrc] = useState<null | string>(null)
  const editorContentElement = useRef(null)
  const floatingMenu = useRef(null)

  const BubbleMenuButtons = useMemo(
    () =>
      editor &&
      getEditorButtonList(editor).filter(({ name }) => Buttons_Used_In_BubbleMenu.includes(name)),
    [editor],
  )

  const FloatingMenuButtons = useMemo(
    () =>
      editor &&
      getEditorButtonList(editor).filter(({ name }) => !Buttons_Used_In_BubbleMenu.includes(name)),
    [editor],
  )

  const FixedMenuButtons = useMemo(
    () =>
      editor &&
      getEditorButtonList(editor).filter(({ name }) => Buttons_Used_In_FixedMenu.includes(name)),
    [editor],
  )

  const handleOnCloseDrawer = useCallback((onCloseDrawer, executeEditorCommand) => {
    onCloseDrawer()
    return executeEditorCommand()
  }, [])

  const dispatchSaveContent = useCallback(
    debounce(content => saveContentOnEditorUpdate(content), 4000),
    [],
  )

  useEffect(() => {
    if (imageSrc) {
      onCloseModal()
      onCloseDrawer()
      editor?.chain().setImage({ src: imageSrc }).run()
    }
  }, [imageSrc, editor])

  useEffect(() => {
    console.log(FloatingMenuButtons)
    editor?.on('update', ({ editor }: any) => {
      console.log(editor)
      dispatchSaveContent(editor.getJSON())
    })
  }, [editor, dispatchSaveContent])

  if (!editor) return null

  return (
    <>
      {isDrawerOpen && (
        <MobileMenuDrawer isOpen={isDrawerOpen} onClose={onCloseDrawer}>
          <SimpleGrid columns={2} spacing={6}>
            {FloatingMenuButtons?.map(EditorButton => (
              <Button
                onClick={() =>
                  handleOnCloseDrawer(onCloseDrawer, EditorButton.executeEditorCommand)
                }
                key={EditorButton.name}
                boxShadow="lg"
                bgColor="white"
                borderRadius="5">
                <Icon as={EditorButton.icon} boxSize="6" size="24px" color="gray.700" />
              </Button>
            ))}
            <ImageButton handleClick={onModalOpen} />
          </SimpleGrid>
        </MobileMenuDrawer>
      )}
      {isModalOpen && (
        <SetImageModal
          onClose={onCloseModal}
          isOpen={isModalOpen}
          setImageUrlOnSuccess={setImageSrc}
          siteId={siteId}
        />
      )}
      <Box p="1" ref={floatingMenu}>
        <FloatingMenu editor={editor} tippyOptions={{ zIndex: 1, placement: 'left' }}>
          <IconButton
            onClick={() => (isLargerThan1280 ? onMenuOpen() : onOpenDrawer())}
            bg="blue.200"
            boxShadow="lg"
            aria-label="add"
            size={'sm'}
            icon={<AddIcon />}
          />
          <Portal containerRef={floatingMenu}>
            {isMenuOpen && (
              <Menu
                isOpen={isMenuOpen}
                onClose={onMenuClose}
                closeOnSelect={false}
                placement="auto-end"
                size="xl">
                <MenuList whiteSpace="unset" bg="gray.50" p="1" ml="4" mt="4">
                  {FloatingMenuButtons?.map(EditorButton => (
                    <MenuItem
                      onClick={EditorButton.executeEditorCommand}
                      key={EditorButton.name}
                      boxShadow="xl"
                      bg="white"
                      _hover={{ bg: 'blue.100' }}
                      border="none"
                      borderRadius="0">
                      <Icon
                        as={EditorButton.icon}
                        boxSize="6"
                        size="24px"
                        color="gray.700"
                        mr="2"
                      />{' '}
                      {EditorButton.name}
                    </MenuItem>
                  ))}
                  <ImageMenuItem handleClick={onModalOpen} />
                </MenuList>
              </Menu>
            )}
          </Portal>
        </FloatingMenu>
        <BubbleMenu editor={editor} tippyOptions={{ maxWidth: 'none' }}>
          <HStack
            bg="white"
            boxShadow="2xl"
            px="2"
            py="1.5"
            rounded="xl"
            align="center"
            _after={Bubble_Menu_Style}
            bgColor="gray.300"
            display={{ base: 'none', lg: 'block' }}
            color="gray.900"
            spacing="0">
            {BubbleMenuButtons?.map(EditorButton => (
              <Button
                onClick={EditorButton.executeEditorCommand}
                key={EditorButton.name}
                border="none"
                _hover={{ bg: 'gray.100' }}
                bg="none"
                rounded="md">
                <Icon as={EditorButton.icon} boxSize="5" color="gray.700" rounded={'md'} />
              </Button>
            ))}
          </HStack>
        </BubbleMenu>
        <EditorContent editor={editor} ref={editorContentElement} />
      </Box>
      <Box
        w="full"
        maxW={'98vw'}
        position="fixed"
        display={{ base: 'block', lg: 'none' }}
        p={{ base: '0', sm: '1', md: '2' }}
        m="1"
        rounded={{ base: 'md', md: 'lg' }}
        borderRadius="4"
        bottom="2"
        right="0"
        left="0"
        bg="gray.300"
        zIndex={1000}
        shadow="md">
        <HStack spacing={[1, 4, 8]} justify={{ base: 'center' }}>
          {FixedMenuButtons?.map(EditorButton => (
            <Button
              onClick={EditorButton.executeEditorCommand}
              key={EditorButton.name}
              bg="none"
              rounded={{ base: 'sm', sm: 'md', md: 'lg' }}>
              <Icon as={EditorButton.icon} boxSize="5" color="gray.700" rounded={'md'} />
            </Button>
          ))}
        </HStack>
      </Box>
    </>
  )
}
