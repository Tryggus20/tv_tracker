import React, { useState } from "react";
import {
  Button,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Checkbox,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchShows } from "../../redux/actions/showActions";
import axios from "axios";
import { getAuth } from 'firebase/auth';

const buttonStyle = {
  minWidth: "24px",
  padding: "4px",
  margin: "0 4px",
  fontSize: "12px",
};

function ShowContainer({ shows, onShowClick, onEpisodeClick }) {
  const dispatch = useDispatch();
  const [editingShowId, setEditingShowId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const getUserEmail = () => {
    const auth = getAuth();
    return auth.currentUser?.email;
  };

  const handleIncrementSeason = async (id, currentSeason) => {
    try {
      await axios.put(`/api/tv/${id}`, { season: currentSeason + 1 });
      dispatch(fetchShows(getUserEmail())); // Refresh shows after update
    } catch (error) {
      console.error("Error incrementing season:", error);
    }
  };

  const handleDecrementSeason = async (id, currentSeason) => {
    try {
      await axios.put(`/api/tv/${id}`, { season: currentSeason - 1 });
      dispatch(fetchShows(getUserEmail())); // Refresh shows after update
    } catch (error) {
      console.error("Error decrementing season:", error);
    }
  };

  const handleIncrementEpisode = async (id, currentEpisode) => {
    try {
      await axios.put(`/api/tv/${id}`, { episode: currentEpisode + 1 });
      dispatch(fetchShows(getUserEmail())); // Refresh shows after update
    } catch (error) {
      console.error("Error incrementing episode:", error);
    }
  };

  const handleDecrementEpisode = async (id, currentEpisode) => {
    try {
      await axios.put(`/api/tv/${id}`, { episode: currentEpisode - 1 });
      dispatch(fetchShows(getUserEmail())); // Refresh shows after update
    } catch (error) {
      console.error("Error decrementing episode:", error);
    }
  };

  const handleEditClick = (show) => {
    setEditingShowId(show.id);
    console.log("TESTING TESTING TESTING", show, show.id);
    setEditedValues({
      id: show.id,
      notes: show.notes,
      series_ended: show.series_ended,
      is_completed: show.is_completed,
      release_date: show.release_date,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveClick = () => {
    console.log("edited values: ", editedValues);
    dispatch({ type: "EDIT_SHOW", payload: editedValues });
    setEditingShowId(null);
  };

  const handleCancelClick = () => {
    setEditingShowId(null);
    setEditedValues({});
  };

  return (
    <TableBody className="table-body">
      {Array.isArray(shows) && shows.length > 0 ? (
        shows.map((show) => (
          <TableRow className="table-row" key={show.id}>
            <TableCell>
              <img
                src={show.image_url}
                alt={show.show_name}
                style={{ width: "50px", height: "auto" }}
              />
            </TableCell>
            <TableCell
              onClick={() => onShowClick(show)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {show.show_name}
            </TableCell>
            <TableCell className="centerText" style={{ minWidth: "86px" }}>
              <span>
                <Button
                  className="custom-button"
                  style={buttonStyle}
                  onClick={() => handleDecrementSeason(show.id, show.season)}
                >
                  &lt;
                </Button>
                S:{show.season}
                <Button
                  className="custom-button"
                  style={buttonStyle}
                  onClick={() => handleIncrementSeason(show.id, show.season)}
                >
                  &gt;
                </Button>
              </span>
            </TableCell>
            <TableCell className="centerText" style={{ minWidth: "86px" }}>
              <Button
                className="custom-button"
                style={buttonStyle}
                onClick={() => handleDecrementEpisode(show.id, show.episode)}
              >
                &lt;
              </Button>
              <div
                onClick={() =>
                  onEpisodeClick(show.tvmaze_id, show.season, show.episode)
                }
                style={{
                  cursor: "pointer",
                  color: "blue",
                  display: "inline",
                }}
              >
                E:{show.episode}
              </div>
              <Button
                className="custom-button"
                style={buttonStyle}
                onClick={() => handleIncrementEpisode(show.id, show.episode)}
              >
                &gt;
              </Button>
            </TableCell>
            <TableCell className="centerText">{show.genre}</TableCell>
            {editingShowId === show.id ? (
              <>
                <TableCell className="centerText">
                  <TextField
                    name="notes"
                    value={editedValues.notes}
                    onChange={handleInputChange}
                    size="small"
                  />
                </TableCell>
                <TableCell className="centerText">
                  <Checkbox
                    name="series_ended"
                    checked={editedValues.series_ended}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell className="centerText">
                  <Checkbox
                    name="is_completed"
                    checked={editedValues.is_completed}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleSaveClick(show.id)}>Save</Button>
                  <Button onClick={handleCancelClick}>Cancel</Button>
                </TableCell>
                <TableCell className="centerText">
                  <TextField
                    name="release_date"
                    type="date"
                    value={editedValues.release_date || ""}
                    onChange={handleInputChange}
                    size="small"
                  />
                </TableCell>
                
              </>
            ) : (
              <>
                <TableCell className="centerText">{show.notes || "----"}</TableCell>
                <TableCell className="centerText">
                  {show.series_ended ? "Yes" : "No"}
                </TableCell>
                <TableCell className="centerText">
                  {show.is_completed ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(show)}>Edit</Button>
                </TableCell>
                <TableCell className="centerText">
                  {show.release_date || "----"}
                </TableCell>
              </>
            )}
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
