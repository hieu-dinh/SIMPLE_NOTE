import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'

const Notecard = ( {note} ) => {
  return (
  <Card>
    <CardHeader>
        <Flex gap={4}>
            {/* Left */}
            <Flex flex={1} gap={4} alignItems={"center"}>
                <Avatar src="https://avatar.iran.liara.run/public" />
                <Box>
                    <Heading size="sm">{note.title}</Heading>
                    <Text>{note.date}</Text>
                </Box>
            </Flex>
            {/* Right */}
            <Flex>
                <EditModal />
                <IconButton
                    variant={"ghost"}
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See Menu'
                    icon={<BiTrash size={20}  />}
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