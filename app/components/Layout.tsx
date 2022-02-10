import { Sidebar } from './Sidebar'
import { Flex, Box, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import * as React from 'react'
import { NavItemsDrawer } from './Drawers/NavItemsDrawer'

type Props = {
  children: React.ReactNode
  showNavItems?: boolean
  isNavItemsDrawerOpen: boolean
  onCloseNavItemsDrawer: () => void
  onOpenNavItemsDrawer: () => void
}

export function Layout({
  children,
  showNavItems = true,
  isNavItemsDrawerOpen,
  onOpenNavItemsDrawer,
  onCloseNavItemsDrawer,
}: Props) {
  return (
    <Flex h="full" minH="100vh" direction={{ base: 'column', lg: 'row' }}>
      <Sidebar display={{ base: 'none', lg: 'unset' }} position="fixed" />
      <Box flex="1" ml={{ base: 0, lg: '20%' }}>
        {children}
      </Box>

      {showNavItems && (
        <IconButton
          w="100%"
          display={{ base: 'block', lg: 'none' }}
          position="fixed"
          bottom="0"
          bg="gray.50"
          zIndex={1000}
          shadow="inner"
          onClick={onOpenNavItemsDrawer}
          rounded="none"
          icon={isNavItemsDrawerOpen ? <CloseIcon w={5} h={5} /> : <HamburgerIcon w={7} h={7} />}
          variant={'ghost'}
          aria-label={'Toggle Navigation'}
        />
      )}
      <NavItemsDrawer isOpen={isNavItemsDrawerOpen} onClose={onCloseNavItemsDrawer} />
    </Flex>
  )
}
