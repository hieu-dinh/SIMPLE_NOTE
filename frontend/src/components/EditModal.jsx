import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from "@chakra-ui/react"
import { BiEditAlt } from "react-icons/bi"

function EditModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
    <>
        <IconButton
 				onClick={onOpen}
				variant='ghost'
 				colorScheme='blue'
 				aria-label='See menu'
 				size={"sm"}
 				icon={<BiEditAlt size={20} />}
 		/>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Note</ModalHeader>
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
                        <Button colorScheme="blue" mr={3}>Update</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    );
    }
export default EditModal