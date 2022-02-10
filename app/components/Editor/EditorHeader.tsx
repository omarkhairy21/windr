import { Button, Flex, Box, IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSite } from 'hooks/useSite'
import { Content } from '@tiptap/react'
import { useAuth } from '@hooks/useAuth'
import { API_URL } from '@constants'

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

export function EditorHeader({ content, onOpenNavItemsDrawer }: EditorHeaderProps) {
  const { authToken } = useAuth()
  const {
    query: { id },
  } = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasSaved, setHasSaved] = useState<boolean>(false)
  const { mutate } = useSite(id)

  type CallbackType = () => void
  const handlingSaving = useCallback<CallbackType>(async () => {
    setIsLoading(true)
    const response = await saveSiteContent(authToken, content, id)
    if (response.ok) setHasSaved(true)
    setIsLoading(false)
    mutate()
  }, [content, id, mutate, authToken])

  useEffect(handlingSaving, [handlingSaving])

  useEffect(() => {
    if (hasSaved) {
      setTimeout(() => setHasSaved(false), 2000)
    }
  }, [hasSaved, setHasSaved])

  return (
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
              isLoading={isLoading}
              disabled
              key="saveButton"
              loadingText="Saving">
              {hasSaved ? 'Saved!' : 'Save'}
            </Button>
            <Button bgColor="whatsapp.500" color="gray.50" size="sm">
              Publish
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
