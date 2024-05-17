import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowContainer from "../ShowContainer/ShowContainer";

function ShowList() {
  const dispatch = useDispatch();

  // TODO: may need to change store name
  let { shows } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SHOWS" });
  }, [dispatch]);

  return (
    <div>
      <h2>Hello Shows</h2>
      <tr>
        <ShowContainer shows={shows} />
      </tr>
      <pre>;{JSON.stringify(shows, null, 2)}</pre>
    </div>
  );
}

export default ShowList;
