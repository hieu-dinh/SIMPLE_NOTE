import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from "@chakra-ui/react"
import { BiAddToQueue } from "react-icons/bi"

const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return <>
    <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
        <ModalContent>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        {/* Left */}
                        <FormControl>
                            <FormLabel>Note Title</FormLabel>
                            <Input placeholder="Input note title here" />
                        </FormControl>
                        {/* Right */}
                        <FormControl>
                            <FormLabel>Due Date</FormLabel>
                            <Input placeholder="Input due date here" />
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                            <FormLabel>Note Content</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflow={"hidden"}
                                placeholder="Input note content here"
                            />
                    </FormControl>
                    <RadioGroup defaultValue="personal" mt={4}>
                        <Flex gap={5}>
                            <Radio value="personal">Personal</Radio>
                            <Radio value="work">Work</Radio>
                        </Flex>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>Create</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
        </ModalContent>
    </Modal>
  </>
}

export default CreateUserModal

{/* finished with no error, continue at 1:25:37 */}