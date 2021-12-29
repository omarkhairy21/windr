import { Box, Skeleton, Heading, Center, Icon, VStack } from '@chakra-ui/react'
import { DeleteSiteAlert } from '@components/Alerts/DeleteSiteAlert'
import { useAuth } from '@hooks/useAuth'
import { useSites } from '@hooks/useSites'
import { deleteSiteFetcher } from '@lib/api'
import { useState } from 'react'
import { FcEmptyTrash } from 'react-icons/fc'
import { SiteCard } from './SiteCard'

const NoSites = () => (
  <Center mt="32" color="gray.400">
    <VStack justify="center" align="center">
      <Icon boxSize="10rem" as={FcEmptyTrash} />
      <Heading size="lg" textAlign="center">
        You don&apos;t have any websites yet
      </Heading>
    </VStack>
  </Center>
)

interface ISiteCardsProps {
  onClickEditSite: (siteId: string) => void
}

export function SiteCards({ onClickEditSite }: ISiteCardsProps) {
  const { authToken } = useAuth()
  const [siteId, setSiteID] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const onClose = () => setIsOpen(false)
  const { sites, error, isLoading, mutate } = useSites()

  const handleDeleteSite = async () => {
    setIsDeleting(true)
    const response = await deleteSiteFetcher(`sites/${siteId}`, authToken)
    if (response.id) mutate()
    setIsOpen(false)
    setIsDeleting(false)
  }

  if (error) return <Box>{error?.info}</Box>
  if (isLoading) return <Skeleton h="150px" mt="10" />
  return (
    <Box>
      {sites?.length ? (
        sites?.map(({ name, slug, subDomain, customDomain, isDrafted, id }) => (
          <SiteCard
            name={name}
            siteUrl={customDomain ? customDomain : `${subDomain}.windr.co`}
            siteId={id}
            isDrafted={isDrafted}
            slug={slug}
            key={slug}
            onClickEditSite={onClickEditSite}
            openDeleteAlertDialog={() => {
              setIsOpen(true)
              setSiteID(id)
            }}
          />
        ))
      ) : (
        <NoSites />
      )}
      <DeleteSiteAlert
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteSiteCb={handleDeleteSite}
        isButtonDeleteLoading={isDeleting}
      />
    </Box>
  )
}
