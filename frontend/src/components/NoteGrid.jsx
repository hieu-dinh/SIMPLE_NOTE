import { Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import Notecard from './Notecard'
import { useEffect, useState } from 'react';
import { BASE_URL } from '../App';

const NoteGrid = ({notes, setNotes}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await fetch( BASE_URL + "/notes");
        const data = await res.json();

        if(!res.ok) {
          throw new  Error(data.error);
        }
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getNotes();
  }, []);

  console.log(notes);
  return (
    <>
      <Grid
        templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
      >
      {notes.map((note) => (
        <Notecard key={note.id} note={note} setNotes={setNotes} />
      ))}  
      </Grid>
      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
        </Flex>
      )}
      {!isLoading && notes.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Let Create a some Note Today!
            </Text>
              No notes have been found.
          </Text>
        </Flex>
      )}
    </>
  );
};
export default NoteGrid
