import { AlignCenter } from "lucide-react";
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
import { updateShow } from "../../redux/actions/showActions";
import axios from "axios";
import { useDispatch } from "react-redux";

const buttonStyle = {
  minWidth: "24px",
  padding: "4px",
  margin: "0 4px",
  fontSize: "12px",
};

const cellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function ShowContainer({ shows, onShowClick, onEpisodeClick }) {
  const dispatch = useDispatch();
  const handleIncrementSeason = async (id, currentSeason) => {
    try {
      await axios.put(`/api/tv/${id}`, { season: currentSeason + 1 });
      dispatch({ type: "FETCH_SHOWS" }); // Refresh shows after update
    } catch (error) {
      console.error("Error incrementing season:", error);
    }
  };

  const handleDecrementSeason = async (id, currentSeason) => {
    try {
      await axios.put(`/api/tv/${id}`, { season: currentSeason - 1 });
      dispatch({ type: "FETCH_SHOWS" }); // Refresh shows after update
    } catch (error) {
      console.error("Error decrementing season:", error);
    }
  };

  const handleIncrementEpisode = async (id, currentEpisode) => {
    try {
      await axios.put(`/api/tv/${id}`, { episode: currentEpisode + 1 });
      dispatch({ type: "FETCH_SHOWS" }); // Refresh shows after update
    } catch (error) {
      console.error("Error incrementing episode:", error);
    }
  };

  const handleDecrementEpisode = async (id, currentEpisode) => {
    try {
      await axios.put(`/api/tv/${id}`, { episode: currentEpisode - 1 });
      dispatch({ type: "FETCH_SHOWS" }); // Refresh shows after update
    } catch (error) {
      console.error("Error decrementing episode:", error);
    }
  };

  // TODO: Clicking on tv show name will pull up a quick synopsis and picture IN PROGRESS
  // TODO: Clicking on the show episode will pull up a synopsis of the episode for that show IN PROGRESS
  // TODO: ***** Update DB to allow synopsis of show to be saved.
  // TODO: ****** also save tvmaze ID for each tv show to make episode synopsis searches easier
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
            </TableCell>{" "}
            <TableCell className="centerText">
              {" "}
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
            <TableCell className="centerText">
              <div
                onClick={() =>
                  onEpisodeClick(show.tvmaze_id, show.season, show.episode)
                }
                style={{ cursor: "pointer", color: "blue", cellStyle }}
              >
                <Button
                  className="custom-button"
                  style={buttonStyle}
                  onClick={() => handleDecrementEpisode(show.id, show.episode)}
                >
                  &lt;
                </Button>
                E:{show.episode}
                <Button
                  className="custom-button"
                  style={buttonStyle}
                  onClick={() => handleIncrementEpisode(show.id, show.episode)}
                >
                  &gt;
                </Button>
              </div>
            </TableCell>
            <TableCell className="centerText">{show.genre}</TableCell>
            <TableCell className="centerText">{show.notes || "----"}</TableCell>
            <TableCell className="centerText">
              {show.series_ended ? "Yes" : "No"}
            </TableCell>
            <TableCell className="centerText">
              {show.is_completed ? "Yes" : "No"}
            </TableCell>
            <TableCell>
              <Button>Edit</Button>
            </TableCell>
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
