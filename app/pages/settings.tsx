import { Box, Heading, useDisclosure } from '@chakra-ui/layout'
import { Layout } from '@components/Layout'

export default function Dashboard() {
  const {
    isOpen: isNavItemsDrawerOpen,
    onOpen: onOpenNavItemsDrawer,
    onClose: onCloseNavItemsDrawer,
  } = useDisclosure()
  return (
    <>
      <Layout
        onOpenNavItemsDrawer={onOpenNavItemsDrawer}
        onCloseNavItemsDrawer={onCloseNavItemsDrawer}
        isNavItemsDrawerOpen={isNavItemsDrawerOpen}>
        <Box>
          <Heading>There will be Setting Here</Heading>
        </Box>
      </Layout>
    </>
  )
}
