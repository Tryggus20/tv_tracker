import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowContainer from "../ShowContainer/ShowContainer";
import {
  Button,
  Paper,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function ShowList() {
  const dispatch = useDispatch();

  // TODO: may need to change store name
  let { shows } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SHOWS" });
  }, [dispatch]);

  return (
    <div>

      <br />

      <TextField
        label="Show Name"
        size="small"
        variant="outlined"
        sx={{ mr: 2 }} 
      />
      <Button variant="contained" color="secondary">
        Add New Show
      </Button>
      <br />
      <hr></hr>
      <Paper>
        <Table className="table">
          <TableHead className="table-header">
            <TableRow className="table-row">
              <TableCell className="table-header-left">Tv Show</TableCell>
              <TableCell>Season</TableCell>
              <TableCell>Episode</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Done airing?</TableCell>
              <TableCell>Caught up? </TableCell>
              <TableCell className="table-header-right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <ShowContainer shows={shows} />
        </Table>
      </Paper>
      <hr />
      {/* <pre>;{JSON.stringify(shows, null, 2)}</pre> */}
    </div>
  );
}

export default ShowList;
