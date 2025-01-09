import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi"
import { BASE_URL } from "../App";

const CreateUserModal = ({ setNotes }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        date: "",
        category: ""
    });
    const toast = useToast();

    const handleCreateNote = async (e) => {
        e.preventDefault(); // prevent page refresh
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            })

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            toast({
                title: "Yayy!!! 🎉",
                description: "Your note has been created successfully.",
                status: "success",
                duration: 3000,
                position: "top-center",
                isCloseable: true,
            });
            onClose();
            setNotes((prevNotes) => [...prevNotes, data]);
        } catch (error) {
            toast({
                status: "error",
                title: "An error occurred.",
                description: error.message,
                duration: 4000,
                position: "top-center",
                isCloseable: true,
            });
        } finally {
            setIsLoading(false);
            setInputs({
                title: "",
                content: "",
                date: "",
                category: "",
            }); // clear inputs
        }
    };
  
    return <>
    <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
        <form onSubmit={handleCreateNote}>
        <ModalContent>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        {/* Left */}
                        <FormControl>
                            <FormLabel>Note Title</FormLabel>
                            <Input placeholder="Input note title here"
                            value={inputs.title}
                            onChange={(e) => setInputs({...inputs, title: e.target.value})}
                            />
                        </FormControl>
                        {/* Right */}
                        <FormControl>
                            <FormLabel>Due Date</FormLabel>
                            <Input placeholder="Input due date here" 
                                value={inputs.date}
                                onChange={(e) => setInputs({...inputs, date: e.target.value})}
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
                                onChange={(e) => setInputs({...inputs, content: e.target.value})}
                            />
                    </FormControl>
                    <RadioGroup defaultValue="personal" mt={4}>
                        <Flex gap={5}>
                            <Radio value="personal"
                                onChange={(e) => setInputs({...inputs, category: e.target.value})}
                            >Personal</Radio>
                            <Radio value="work"
                                onChange={(e) => setInputs({...inputs, category: e.target.value})}
                            >Work</Radio>
                        </Flex>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>Create</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
        </ModalContent>
        </form>
    </Modal>
  </>
}
export default CreateUserModal