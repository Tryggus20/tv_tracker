import { AlignCenter } from "lucide-react";
import { Button, Paper, TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { updateShow } from '../../redux/actions/showActions';
import axios from "axios";
import { useDispatch } from 'react-redux';

const buttonStyle = {
    minWidth: '24px', // Smaller width
    padding: '4px',   // Smaller padding
    margin: '0 4px',  // Margin for spacing
    fontSize: '12px',
  };
  
  const cellStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

function ShowContainer({ shows }) {
    const dispatch = useDispatch();
    const handleIncrementSeason = async (id, currentSeason) => {
        try {
          await axios.put(`/api/tv/${id}`, { season: currentSeason + 1 });
          dispatch({ type: 'FETCH_SHOWS' }); // Refresh shows after update
        } catch (error) {
          console.error('Error incrementing season:', error);
        }
      };
    
      const handleDecrementSeason = async (id, currentSeason) => {
        try {
          await axios.put(`/api/tv/${id}`, { season: currentSeason - 1 });
          dispatch({ type: 'FETCH_SHOWS' }); // Refresh shows after update
        } catch (error) {
          console.error('Error decrementing season:', error);
        }
      };

      const handleIncrementEpisode = async (id, currentEpisode) => {
        try {
          await axios.put(`/api/tv/${id}`, { episode: currentEpisode + 1 });
          dispatch({ type: 'FETCH_SHOWS' }); // Refresh shows after update
        } catch (error) {
          console.error('Error incrementing episode:', error);
        }
      };
    
      const handleDecrementEpisode = async (id, currentEpisode) => {
        try {
          await axios.put(`/api/tv/${id}`, { episode: currentEpisode - 1 });
          dispatch({ type: 'FETCH_SHOWS' }); // Refresh shows after update
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
            <TableCell className="centerText"> <span>
              <Button className="custom-button" style={buttonStyle} onClick={() => handleDecrementSeason(show.id, show.season)}>&lt;</Button>
              S:{show.season}
              <Button  className="custom-button" style={buttonStyle} onClick={() => handleIncrementSeason(show.id, show.season)}>&gt;</Button>
              </span></TableCell>
            <TableCell className="centerText">
              <Button className="custom-button" style={buttonStyle} onClick={() => handleDecrementEpisode(show.id, show.episode)}>&lt;</Button>
              E:{show.episode}
              <Button className="custom-button" style={buttonStyle} onClick={() => handleIncrementEpisode(show.id, show.episode)}>&gt;</Button>
            </TableCell>
            <TableCell className="centerText">{show.genre}</TableCell>
            <TableCell className="centerText">{show.notes || '----'}</TableCell>
            <TableCell className="centerText">{show.series_ended ? 'Yes' : 'No'}</TableCell>
            <TableCell className="centerText">{show.is_completed ? 'Yes' : 'No'}</TableCell>
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