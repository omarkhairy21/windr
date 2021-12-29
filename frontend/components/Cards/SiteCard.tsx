import { SettingsIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Menu,
  Badge,
  Link as ChakraLink,
  Flex,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import Link from 'next/link'

type SiteCardProps = {
  name: string
  siteUrl: string
  siteId: string
  isDrafted: boolean
  slug: string
  openDeleteAlertDialog: () => void
  onClickEditSite: (siteId: string) => void
}

export function SiteCard({
  name,
  siteUrl,
  isDrafted,
  slug,
  siteId,
  openDeleteAlertDialog,
  onClickEditSite,
}: SiteCardProps) {
  return (
    <Box bg="gray.200" p="8" rounded="md" mt="7" shadow="lg">
      <Flex justify="space-between">
        <Heading color="gray.600">
          <Link href={`site/${slug}?id=${siteId}`}>{name}</Link>
        </Heading>
        <Menu>
          <MenuButton as={IconButton} colorScheme="gray" icon={<SettingsIcon />} />
          <MenuList>
            <MenuItem onClick={() => onClickEditSite(siteId)}>Edit</MenuItem>
            <MenuItem>Add Custom Domain</MenuItem>
            <MenuItem onClick={openDeleteAlertDialog} color="red">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Heading as="h3" size="sm" my="2" color="blue.500">
        <ChakraLink>{siteUrl}</ChakraLink>
      </Heading>
      <Badge colorScheme="yellow" variant="outline">
        {isDrafted ? 'Drafted' : 'Published'}
      </Badge>
    </Box>
  )
}
