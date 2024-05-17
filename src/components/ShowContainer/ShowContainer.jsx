import { AlignCenter } from "lucide-react";

function ShowContainer({ shows }) {
  return (
    <tbody className="table-body">
      {Array.isArray(shows) && shows.length > 0 ? (
        shows.map((show) => (
          <tr className="table-row" key={show.id}>
            <td>{show.show_name} </td>
            <td className="centerText"> <button>&lt;</button>  S:{show.season} <button>&gt;</button> </td>
            <td className="centerText"> <button>&lt;</button> E:{show.episode}<button>&gt;</button> </td>
            <td className="centerText"> {show.genre}</td>
            <td className="centerText"> {show.notes || "----"} </td>
            <td className="centerText">{show.series_ended ? "Yes" : "No"}</td>
            <td className="centerText">{show.is_completed ? "Yes" : "No"}</td>
            <td><button>Edit</button></td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No shows available</td>
        </tr>
      )}
      
    </tbody>
  );
}

export default ShowContainer;
