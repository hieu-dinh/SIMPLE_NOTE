import { Grid } from '@chakra-ui/react'
import Notecard from './Notecard'
import { useEffect, useState } from 'react';

const NoteGrid = ({notes, setNotes}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes");
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
  return (
    <Grid
    templateColumns={{
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  }}
  gap={4}
  >
    {notes.map((note) => (
      <Notecard key={note.id} note={note} />
    ))}  
  </Grid>
  );
};
export default NoteGrid
