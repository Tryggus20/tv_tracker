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
  TablePagination,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { addShow, fetchShows } from "../../redux/actions/showActions";
import Fuse from "fuse.js";
import usePagination from "../../hooks/usePagination";
import { useAuth } from "../../contexts/authContext";

function ShowList() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth(); // Get current user from context
  let { shows } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchShows());
    console.log("fetching shows");
    console.log(shows, {shows})
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");
  const [synopsisShow, setSynopsisShow] = useState(null);
  const [episodeSynopsis, setEpisodeSynopsis] = useState(null);
  const [openSynopsisModal, setOpenSynopsisModal] = useState(false);
  const [openEpisodeModal, setOpenEpisodeModal] = useState(false);

  // Fuzzy search with Fuse.js
  let fuse;
  if (Array.isArray(shows)) {
    fuse = new Fuse(shows, {
      keys: ["show_name", "genre", "notes"],
      threshold: 0.3, // Adjust the threshold as needed
    });
  } else {
    console.error('Expected an array but received:', shows);
  }

  const filteredShows = searchQuery && fuse
    ? fuse.search(searchQuery).map((result) => result.item)
    : shows;

  // Use the custom pagination hook
  const {
    currentPage,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(filteredShows, 10); // Default to 10 rows per page

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleShowClick = (show) => {
    setSynopsisShow(show);
    setOpenSynopsisModal(true);
  };

  const handleCloseSynopsisModal = () => {
    setOpenSynopsisModal(false);
    setSynopsisShow(null);
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
    if (selectedShow && currentUser) {
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
        user_email: currentUser.email
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
      setOpenEpisodeModal(true);
    } catch (error) {
      console.error("Error fetching episode details:", error);
    }
  };

  const handleCloseEpisodeModal = () => {
    setOpenEpisodeModal(false);
    setEpisodeSynopsis(null);
  };

  return (
    <div>
      <br />
      <TextField
        label="Search Shows"
        value={searchQuery}
        onChange={handleSearchChange}
        size="small"
        variant="outlined"
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="secondary" onClick={handleSearchClick}>
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSearchQuery("")}
      >
        Clear
      </Button>
    
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
      {selectedShow && (
        <div>
          <p style={{ fontSize: "10px" }}>Info from tvmaze.com</p>
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
            color="primary"
            onClick={handleClearSearch}
          >
            Clear Search{" "}
          </Button>
        </div>
      )}
      <hr></hr>
      <Paper>
        <Table className="table">
          <TableHead className="table-header">
            <TableRow className="table-row">
              <TableCell>Image </TableCell>
              <TableCell className="table-header-left">Tv Show</TableCell>
              <TableCell>Season</TableCell>
              <TableCell>Episode</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Done Airing?</TableCell>
              <TableCell>Caught Up? </TableCell>
              <TableCell className="table-header-right">Edit</TableCell>
              <TableCell>Release Date</TableCell>
            </TableRow>
          </TableHead>
          <ShowContainer
            shows={paginatedData}
            onShowClick={handleShowClick}
            onEpisodeClick={handleEpisodeClick}
          />
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredShows.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openSynopsisModal}
        onClose={handleCloseSynopsisModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{synopsisShow?.show_name}</DialogTitle>
        <DialogContent>
          {synopsisShow?.show_synopsis?.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") ||
            "No show synopsis available."}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSynopsisModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEpisodeModal}
        onClose={handleCloseEpisodeModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {episodeSynopsis?._links.show.name}: {episodeSynopsis?.name}
        </DialogTitle>
        <DialogContent>
          {episodeSynopsis?.summary?.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") ||
            "No episode synopsis available."}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEpisodeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <hr />
    </div>
  );
}

export default ShowList;
