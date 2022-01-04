import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { SiteFom } from '@components/Forms/SiteForm'

interface CreateSiteDrawerProps {
  onClose: () => void
  isOpen: boolean
  siteId?: string
}

export function CreateSiteDrawer({ onClose, isOpen, siteId }: CreateSiteDrawerProps) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{siteId ? 'Update Site' : 'Create new site'}</DrawerHeader>
        <DrawerBody>{<SiteFom onCloseDrawer={onClose} siteId={siteId} />}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
