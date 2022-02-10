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
      <DrawerContent roundedTop="14">
        <DrawerHeader borderBottomWidth="1px" color="gray.500">
          Links
        </DrawerHeader>
        <DrawerCloseButton color="gray.600" />
        <DrawerBody>
          <NavItems />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
