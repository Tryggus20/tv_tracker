import {
  Button,
  TableBody,
  TableRow,
  TableCell,
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
            <TableCell></TableCell>
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
