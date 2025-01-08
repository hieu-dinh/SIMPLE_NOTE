import { Grid } from '@chakra-ui/react'
import { NOTES } from '../dummy/dummy'
import Notecard from './Notecard'

const NoteGrid = () => {
  return (
    <Grid
    templateColumns={{
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  }}
  gap={4}
  >
    {NOTES.map((note) => (
      <Notecard key={note.id} note={note} />
    ))}  
  </Grid>
  );
};
export default NoteGrid
//Stop video from 1:32:09, error
