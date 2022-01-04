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

interface DeleteSiteAlertProps {
  isOpen: boolean
  isButtonDeleteLoading: boolean
  onClose: () => void
  handleDeleteSiteCb: () => void
}

export function DeleteSiteAlert({
  isOpen,
  isButtonDeleteLoading,
  onClose,
  handleDeleteSiteCb,
}: DeleteSiteAlertProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteSiteCb}
                ml={3}
                isLoading={isButtonDeleteLoading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
