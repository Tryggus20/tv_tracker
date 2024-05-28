import { AlignCenter } from "lucide-react";
import { Button, Paper, TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


function ShowContainer({ shows }) {
  return (
    <tbody className="table-body">
      {Array.isArray(shows) && shows.length > 0 ? (
        shows.map((show) => (
          <TableRow className="table-row" key={show.id}>
            <TableCell>{show.show_name} </TableCell>
            <TableCell className="centerText"> <button>&lt;</button>  S:{show.season} <button>&gt;</button> </TableCell>
            <TableCell className="centerText"> <button>&lt;</button> E:{show.episode}<button>&gt;</button> </TableCell>
            <TableCell className="centerText"> {show.genre}</TableCell>
            <TableCell className="centerText"> {show.notes || "----"} </TableCell>
            <TableCell className="centerText">{show.series_ended ? "Yes" : "No"}</TableCell>
            <TableCell className="centerText">{show.is_completed ? "Yes" : "No"}</TableCell>
            <TableCell><button>Edit</button></TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell>No shows available</TableCell>
        </TableRow>
      )}
      
    </tbody>
  );
}

export default ShowContainer;
