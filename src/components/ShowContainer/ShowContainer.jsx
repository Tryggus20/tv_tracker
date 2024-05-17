function ShowContainer({ shows }) {
  return (
    <div>
      {Array.isArray(shows) && shows.length > 0 ? (
        shows.map((show) => (
        
            <tr key={show.id}>
              {show.show_name} Season {show.season} Episode {show.episode}
            </tr>
        ))
      ) : (
        <p>No shows available</p>
      )}
      ,
    </div>
  );
}

export default ShowContainer;
