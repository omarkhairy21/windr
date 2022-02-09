import { Button, Flex } from '@chakra-ui/react'
import { API_URL } from '@constants'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSite } from 'hooks/useSite'
import { Content } from '@tiptap/react'
import { useAuth } from '@hooks/useAuth'

interface EditorHeaderProps {
  content: Content
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

export function EditorHeader({ content }: EditorHeaderProps) {
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
    <Flex
      pos="fixed"
      top="0"
      left="0"
      right="0"
      justify="flex-end"
      backgroundColor="gray.50"
      p={['1', '3', '4']}
      borderStyle={'solid'}
      borderBottom="1">
      <Flex justify="center" align="center">
        <Button
          color="gray.800"
          mr="2"
          variant="ghost"
          isLoading={isLoading}
          disabled
          key="saveButton"
          loadingText="Saving">
          {hasSaved ? 'Saved!' : 'Save'}
        </Button>
        <Button bgColor="blue.500" color="gray.50" size="sm">
          Publish
        </Button>
      </Flex>
    </Flex>
  )
}
