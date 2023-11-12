export default function Show_Attribute({ person, attribute }) {
  return (
    <>
      {person[attribute.toLowerCase()] === null || person[attribute.toLowerCase()].length <= 0 ? (
        ""
      ) : (
        <>
          <div>{attribute}</div>
          <div>{person[attribute.toLowerCase()]}</div>
        </>
      )}
    </>
  );
}
