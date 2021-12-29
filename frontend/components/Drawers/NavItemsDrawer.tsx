import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { NavItems } from '../NavItems'

interface NavItemsDrawerProps {
  onClose: () => void
  isOpen: boolean
}

export function NavItemsDrawer({ onClose, isOpen }: NavItemsDrawerProps) {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Windr</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <NavItems />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
