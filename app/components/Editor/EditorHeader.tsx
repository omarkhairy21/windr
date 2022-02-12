import { Button, Flex, Box, IconButton, useDisclosure, useToast } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSite } from 'hooks/useSite'
import { Content } from '@tiptap/react'
import { useAuth } from '@hooks/useAuth'
import { API_URL } from '@constants'
import { PublishSiteAlert } from '../Alerts/PublishSiteAlert'

interface EditorHeaderProps {
  content: Content
  onOpenNavItemsDrawer: () => void
}

const saveSiteContent = async (token: string | null, content: any, id: any) => {
  return fetch(`${API_URL}/sites/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  })
}

const changeSiteStateToPublish = async (token: string | null, id: any) => {
  return fetch(`${API_URL}/sites/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isDrafted: false }),
  })
}

type CallbackType = () => void

export function EditorHeader({ content, onOpenNavItemsDrawer }: EditorHeaderProps) {
  const { authToken } = useAuth()
  const {
    query: { id },
  } = useRouter()
  const [isSavingContent, setIsSavingContent] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)
  const [hasSaved, setHasSaved] = useState<boolean>(false)
  const { mutate, site } = useSite(id)
  const toast = useToast()

  const {
    isOpen: isAlerterOpen,
    onOpen: onOpenPublishSiteAlert,
    onClose: onClosePublishSiteAlert,
  } = useDisclosure()

  const handlingSaving = useCallback<CallbackType>(async () => {
    setIsSavingContent(true)
    const response = await saveSiteContent(authToken, content, id)
    if (response.ok) setHasSaved(true)
    setIsSavingContent(false)
    mutate()
  }, [content, id, mutate, authToken])

  const handlingPublishingSite = useCallback<CallbackType>(async () => {
    setIsPublishing(true)
    const response = await changeSiteStateToPublish(authToken, id)
    if (response.ok) setIsPublishing(false)
    mutate()
    onClosePublishSiteAlert()
    toast({
      title: 'Site is published, it takes a few seconds to be visible',
      description: `You can visit from this url ${site?.subDomain}.windr.co`,
      status: 'success',
      duration: 15000,
      isClosable: true,
    })
  }, [id, mutate, authToken])

  useEffect(handlingSaving, [handlingSaving])

  useEffect(() => {
    console.log(hasSaved)
    if (hasSaved) {
      setTimeout(() => setHasSaved(false), 2000)
    }
  }, [hasSaved, setHasSaved])

  return (
    <>
      <PublishSiteAlert
        isOpen={isAlerterOpen}
        isButtonSaveLoading={isPublishing}
        onClose={onClosePublishSiteAlert}
        handlePublishSiteCb={handlingPublishingSite}
      />
      <Box pos="fixed" w={{ base: 'full', lg: '80%' }} zIndex="10" h="7">
        <Box position="relative">
          <Flex justify="space-between" p={['1', '2']} bg="gray.50" boxShadow="sm">
            <Box p={'1'}>
              <IconButton
                onClick={onOpenNavItemsDrawer}
                bg="gray.100"
                boxShadow="sm"
                size="md"
                aria-label="open menu"
                variant="outline"
                color={'gray.500'}
                display={{ sm: 'block', lg: 'none' }}
                icon={<HamburgerIcon />}
              />
            </Box>
            <Flex justify="space-around" align="center">
              <Button
                color="gray.900"
                mr="1"
                variant="ghost"
                isLoading={isSavingContent}
                disabled
                key="saveButton"
                loadingText="Saving">
                {hasSaved ? 'Saved!' : 'Save'}
              </Button>
              <Button
                bgColor="whatsapp.500"
                color="gray.50"
                size="sm"
                onClick={onOpenPublishSiteAlert}>
                Publish
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
