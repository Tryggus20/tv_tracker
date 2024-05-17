import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowContainer from "../ShowContainer/ShowContainer";
import {useTable} from 'react-table';

function ShowList() {
  const dispatch = useDispatch();

  // TODO: may need to change store name
  let { shows } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SHOWS" });
  }, [dispatch]);

  return (
    <div>
        <button>Save Changes</button>
        <button>Add New Show</button>
        <br/>
        <hr></hr>

      <table className="table">
        <thead className="table-header">
            <tr className="table-row">
                <th className="table-header-left">Tv Show</th>
                <th>Season</th>
                <th>Episode</th>
                <th>Genre</th>
                <th>Notes</th>
                <th>Is the show done airing?</th>
                <th>Are you Caught up? </th>
                <th className="table-header-right">Edit</th>
            </tr>
        </thead>
        <ShowContainer shows={shows} />
      </table>
      <hr/>
      {/* <pre>;{JSON.stringify(shows, null, 2)}</pre> */}
    </div>
  );
}

export default ShowList;
