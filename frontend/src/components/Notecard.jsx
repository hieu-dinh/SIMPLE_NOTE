import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'
import { BASE_URL } from '../App';

const Notecard = ( { note, setNotes }) => {
    const Toast = useToast();
    const handleDeleteUser = async () => {
        try {
            const res = await fetch(BASE_URL + "/notes/" + note.id, {
                method: "DELETE"
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
            Toast({
                title: "Note deleted successfully 🗑 ",
                status: "success",
                duration: 3000,
                position: "top-center",
                isCloseable: true
            })
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 4000,
                isClosable: true
            })
        }
    }
    return (
    <Card>
    <CardHeader>
        <Flex gap={4}>
            {/* Left */}
            <Flex flex={1} gap={4} alignItems={"center"}>
                <Avatar src={"https://avatar.iran.liara.run/public"} />
                <Box>
                    <Heading size="sm">{note.title} <i>({note.category})</i></Heading>
                    <Text>{note.date}</Text>
                </Box>
            </Flex>
            {/* Right */}
            <Flex>
                <EditModal 
                    notes={note}
                    setNotes={setNotes}
                />
                <IconButton
                    variant={"ghost"}
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See Menu'
                    icon={<BiTrash size={20}
                    onClick={handleDeleteUser}  />}
                />
            </Flex>
        </Flex>
    </CardHeader>
    <CardBody>
        {note.content}
    </CardBody>
  </Card>
    );
};
export default Notecard