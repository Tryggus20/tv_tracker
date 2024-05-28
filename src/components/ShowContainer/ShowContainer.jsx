import { AlignCenter } from "lucide-react";
import { Button, Paper, TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';


function ShowContainer({ shows }) {
    const handleIncrementSeason = async (id, currentSeason) => {
        try {
          await axios.put(`/api/shows/${id}`, { season: currentSeason + 1 });
        } catch (error) {
          console.error('Error incrementing season:', error);
        }
      };
     
  const handleDecrementSeason = async (id, currentSeason) => {
    try {
      await axios.put(`/api/tv/${id}`, { season: currentSeason - 1 });
    } catch (error) {
      console.error('Error decrementing season:', error);
    }
  };

  const handleIncrementEpisode = async (id, currentEpisode) => {
    try {
      await axios.put(`/api/shows/${id}`, { episode: currentEpisode + 1 });
    } catch (error) {
      console.error('Error incrementing episode:', error);
    }
  };

  const handleDecrementEpisode = async (id, currentEpisode) => {
    try {
      await axios.put(`/api/shows/${id}`, { episode: currentEpisode - 1 });
    } catch (error) {
      console.error('Error decrementing episode:', error);
    }
  };
  return (
    <TableBody className="table-body">
      {Array.isArray(shows) && shows.length > 0 ? (
        shows.map((show) => (
          <TableRow className="table-row" key={show.id}>
            <TableCell>{show.show_name} </TableCell>
            <TableCell className="centerText">
              <Button onClick={() => handleDecrementSeason(show.id, show.season)}>&lt;</Button>
              S:{show.season}
              <Button onClick={() => handleIncrementSeason(show.id, show.season)}>&gt;</Button>
            </TableCell>
            <TableCell className="centerText">
              <Button onClick={() => handleDecrementEpisode(show.id, show.episode)}>&lt;</Button>
              E:{show.episode}
              <Button onClick={() => handleIncrementEpisode(show.id, show.episode)}>&gt;</Button>
            </TableCell>
            <TableCell className="centerText"> {show.genre}</TableCell>
            <TableCell className="centerText"> {show.notes || "----"} </TableCell>
            <TableCell className="centerText">{show.series_ended ? "Yes" : "No"}</TableCell>
            <TableCell className="centerText">{show.is_completed ? "Yes" : "No"}</TableCell>
            <TableCell><Button>Edit</Button></TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell>No shows available</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default ShowContainer;