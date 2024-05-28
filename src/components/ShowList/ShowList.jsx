import React, { useEffect, useState } from "react";
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
import axios from "axios";

function ShowList() {
  const dispatch = useDispatch();

  let { shows } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SHOWS" });
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      if (response.data.length > 0) {
        setShowDetails(response.data[0].show);
      } else {
        alert('No show found with that name');
      }
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };
//  *********______*********_________*********______*********_________*********______*********_________
  return (
    <div>
      <br />
      <TextField
        label="Show Name"
        value={searchQuery}
        onChange={handleSearchChange}
        size="small"
        variant="outlined"
        sx={{ mr: 2 }} 
      />
      <Button variant="contained" color="secondary" onClick={handleSearchClick}>
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
      {showDetails && (
        <div>
          <h3>{showDetails.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
          <img src={showDetails.image?.medium} alt={showDetails.name} />
        </div>
      )}
    </div>
  );
}

export default ShowList;
