import { ReactNode } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

interface MobileMenuDrawerProps {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
}

export function MobileMenuDrawer({ onClose, isOpen, children }: MobileMenuDrawerProps) {
  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      size="2xl"
      returnFocusOnClose={false}>
      <DrawerOverlay />
      <DrawerContent
        roundedTop="lg"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 252, 252, 0.3)',
          backdropFilter: 'blur(10.4px)',
        }}>
        <DrawerHeader color="gray.500">Select: </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
