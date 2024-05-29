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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { addShow } from "../../redux/actions/showActions";

function ShowList() {
  const dispatch = useDispatch();

  let { shows } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SHOWS" });
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");
  const [synopsisShow, setSynopsisShow] = useState(null);
  const [episodeSynopsis, setEpisodeSynopsis] = useState(null);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // const handleGenreChange = (event) => {
  //   setGenre(event.target.value);
  // };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleShowClick = (show) => {
    setSynopsisShow(show);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      if (response.data.length > 0) {
        setSearchResults(response.data.slice(0, 5));
        setSelectedShow(null);
      } else {
        alert("No show found with that name");
      }
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };
  const handleAddShowClick = () => {
    if (selectedShow) {
      const showToSave = {
        name: selectedShow.name,
        season: 1,
        episode: 1,
        genre: genre || selectedShow.genres.join(", "),
        notes: notes,
        doneAiring: selectedShow.status === "Ended",
        caughtUp: false,
        lastUpdated: new Date().toISOString(),
        tvmaze_id: selectedShow.id,
        image_url: selectedShow.image?.medium,
        show_synopsis: selectedShow.summary,
      };
      console.log("show to save:", showToSave);
      dispatch(addShow(showToSave));
      handleClearSearch();
    }
  };
  const handleClearSearch = () => {
    setSearchResults([]);
    setSelectedShow(null);
    setSearchQuery("");
    setGenre("");
    setNotes("");
  };
  const handleSelectShow = (show) => {
    setSelectedShow(show);
    setGenre("");
    setNotes("");
    console.log("show info", show);
  };
  const handleEpisodeClick = async (tvmaze_id, season, episode) => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${tvmaze_id}/episodebynumber?season=${season}&number=${episode}`
      );
      setEpisodeSynopsis(response.data);
      console.log("episode synopsis", episodeSynopsis);
    
    } catch (error) {
      console.error("Error fetching episode details:", error);
    }
  };
  // -----_____-----_____-----_____-----_____-----_____-----_____-----_____-----_____-----_____-----_____
  // _____-----_____-----_____-----_____-----_____-----_____-----_____-----_____-----_____-----_____-----
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
        Search New Show
      </Button>
      <br />
      {/* Display search results if no show is selected */}
      {!selectedShow && searchResults.length > 0 && (
        <List>
          {searchResults.map((result) => {
            const show = result.show;
            const year = show.premiered
              ? new Date(show.premiered).getFullYear()
              : "N/A";
            return (
              <ListItem
                button
                onClick={() => handleSelectShow(show)}
                key={show.id}
              >
                <ListItemText primary={`${show.name} (${year})`} />
              </ListItem>
            );
          })}
        </List>
      )}
      {/* Display selected show details */}
      {selectedShow && (
        <div>
          <h3>{selectedShow.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }} />
          <img src={selectedShow.image?.medium} alt={selectedShow.name} />
          <br />
          <TextField
            label="Add Notes"
            value={notes}
            onChange={handleNotesChange}
            size="small"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddShowClick}
          >
            Add Show
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearSearch}
          >
            Clear Search{" "}
          </Button>
        </div>
      )}
      {/* search results end here */}
      <hr></hr>
      <Paper>
        <Table className="table">
          <TableHead className="table-header">
            <TableRow className="table-row">
              <TableCell> </TableCell>
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
          <ShowContainer
            shows={shows}
            onShowClick={handleShowClick}
            onEpisodeClick={handleEpisodeClick}
          />
        </Table>
      </Paper>
      {synopsisShow && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>{synopsisShow.show_name}</h3>
          {synopsisShow.show_synopsis.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") || "No show synopsis available."}
        </div>
      )}
      {episodeSynopsis && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>{episodeSynopsis._links.show.name}: {episodeSynopsis.name}</h3>
          {episodeSynopsis.summary?.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") || "No episode synopsis available."}
        </div>
      )}
      <hr />
    </div>
  );
}

export default ShowList;
