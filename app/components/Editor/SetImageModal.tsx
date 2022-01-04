import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Center,
  Button,
} from '@chakra-ui/react'

import { RiUpload2Fill } from 'react-icons/ri'
import Upload from 'rc-upload'
import { API_URL } from '@constants'
import { useState } from 'react'
import { LoadingSpinner } from '@components/LoadingSpinner'
import { useAuth } from '@hooks/useAuth'

interface SetImageModalProps {
  isOpen: boolean
  siteId: string
  onClose: () => any
  setImageUrlOnSuccess: (url: string) => any
}

export function SetImageModal({
  isOpen,
  onClose,
  setImageUrlOnSuccess,
  siteId,
}: SetImageModalProps) {
  const { authToken } = useAuth()
  const [isUploading, setIsUploading] = useState(false)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab outline="none">Upload</Tab>
                <Tab>URL</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Center>
                    <Upload
                      action={`${API_URL}/attachments`}
                      onSuccess={(res: any) => {
                        setImageUrlOnSuccess(res)
                      }}
                      customRequest={async (options: any) => {
                        setIsUploading(true)
                        const formData = new FormData()
                        formData.append('files.file', options.file)
                        formData.append('data', JSON.stringify({ site: siteId }))
                        const res = await fetch(`${API_URL}/attachments`, {
                          method: 'POST',
                          headers: {
                            Authorization: `Bearer ${authToken}`,
                          },
                          body: formData,
                        })
                        const response = await res.json()
                        const attachResponse = await fetch(
                          `${API_URL}/attachments/${response.id}`,
                          {
                            method: 'GET',
                            headers: {
                              Authorization: `Bearer ${authToken}`,
                            },
                          },
                        )
                        const attachResponseJson = await attachResponse.json()
                        setIsUploading(false)
                        options.onSuccess(attachResponseJson.file.url)
                      }}>
                      {isUploading ? (
                        <Center>
                          <LoadingSpinner marginTop={4} />
                        </Center>
                      ) : (
                        <Button type="submit" leftIcon={<RiUpload2Fill />} colorScheme="blue">
                          upload an image
                        </Button>
                      )}
                    </Upload>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <Input
                      placeholder="image url"
                      onChange={(e: any) => {
                        setImageUrlOnSuccess(e.target.value)
                      }}
                    />
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
