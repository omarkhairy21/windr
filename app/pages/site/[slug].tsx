import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

import { TipTapEditor } from '@components/Editor/TipTapEditor'
import { EditorHeader } from '@components/Editor/EditorHeader'
import { Layout } from '@components/Layout'
import { useSite } from 'hooks/useSite'
import { LoadingSpinner } from '@components/LoadingSpinner'
import { Content } from '@tiptap/react'

export default function Site() {
  const {
    query: { id },
  } = useRouter()

  const siteId = id ? id : Array.isArray(id) ? id[0] : ''

  const [content, setContent] = useState<Content>('Loading!!')
  const { site, isLoading, error } = useSite(id)

  useEffect(() => {
    if (site?.content) {
      console.log(site?.content)
      setContent(site?.content)
    }
  }, [site?.content])

  return (
    <Layout showNavItems={false}>
      {isLoading && <LoadingSpinner />}
      {error && <Box>{error?.message}</Box>}
      {!isLoading && content && (
        <Box>
          <EditorHeader content={content} />
          <TipTapEditor
            siteContent={site?.content}
            saveContentOnEditorUpdate={setContent}
            siteId={siteId}
          />
        </Box>
      )}
    </Layout>
  )
}
