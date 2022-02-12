import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

interface IPublishSiteAlertProps {
  isOpen: boolean
  isButtonSaveLoading: boolean
  onClose: () => void
  handlePublishSiteCb: () => void
}

export function PublishSiteAlert({
  isOpen,
  isButtonSaveLoading,
  onClose,
  handlePublishSiteCb,
}: IPublishSiteAlertProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Publish Site
            </AlertDialogHeader>

            <AlertDialogBody>Are you ready to go live?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={handlePublishSiteCb}
                ml={3}
                isLoading={isButtonSaveLoading}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
