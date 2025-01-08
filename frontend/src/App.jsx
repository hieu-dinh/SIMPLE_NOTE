import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import NoteGrid from "./components/NoteGrid";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  return (
    <Stack minH={"100vh"}>
      <Navbar setNotes={setNotes} />

      <Container maxW={"1200px"} my={4}>
        <Text
        fontSize={{base: "3xl", md: "50" }}
        fontWeight={"bold"}
        letterSpacing={"2px"}
        textTransform={"uppercase"}
        textAlign={"center"}
        mb={8}
        >
          <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
            My Notes</Text>
          🚀
        </Text>
        <NoteGrid notes={notes} setNotes={setNotes} />
      </Container>
    </Stack>
  )
}

export default App
