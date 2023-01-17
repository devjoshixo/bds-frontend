const fetchContacts = async (rowstart, length) => {
  const data = await fetch(
    `http://localhost:5000/contacts?startreq=${rowstart}&endreq=${length}`
  );
  const parsedData = await data.json();
  return parsedData;
};
export default fetchContacts;
