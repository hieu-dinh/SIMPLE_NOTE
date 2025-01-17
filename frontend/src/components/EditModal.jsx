import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi"
import { BASE_URL } from "../constants";

function EditModal( {setNotes, notes} ) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ inputs, setInputs ] = useState({
        title: notes.title,
        date: notes.date,
        content: notes.content,
        category: notes.category
    })
    const toast = useToast();
    const handleEditUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/notes/" + notes.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setNotes((prevNotes) => prevNotes.map((n) => (n.id === notes.id ? data : n)));
            toast({
                title: "Yayy!!! 🎉",
                description: "Your note has been updated successfully.",
                status: "success",
                duration: 3000,
                position: "top-center",
                isCloseable: true
            });
            onClose()
        } catch (error) {
            toast({
                status: "error",
                title: "An error occurred.",
                description: error.message,
                duration: 4000,
                position: "top-center",
                isCloseable: true
            })
        }   finally {
                setIsLoading(false);
            }   
    };

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
            <form onSubmit={handleEditUser}>
            <ModalContent>
                <ModalHeader>Update Note</ModalHeader>
                <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            {/* Left */}
                            <FormControl>
                                <FormLabel>Note Title</FormLabel>
                                <Input placeholder="Input note title here"
                                    value={inputs.title}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, title: e.target.value}))}
                                />
                            </FormControl>
                            {/* Right */}
                            <FormControl>
                                <FormLabel>Due Date</FormLabel>
                                <Input placeholder="Input due date here"
                                    value={inputs.date}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, date: e.target.value}))}
                                />
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                                <FormLabel>Note Content</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflow={"hidden"}
                                    placeholder="Input note content here"
                                    value={inputs.content}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, content: e.target.value}))}
                                />
                        </FormControl>
                        <RadioGroup
                            mt={4}
                            value={inputs.category}
                            onChange={(value) => {setInputs((prev) => ({ ...prev, category: value}))}}>
                        <Flex gap={5}>
                            <Radio value="personal">Personal</Radio>
                            <Radio value="work" >Work</Radio>
                        </Flex>
                    </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type='submit' isLoading={isLoading}>Update</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
            </form>
        </Modal>
      </>
    );
    }

export default EditModal