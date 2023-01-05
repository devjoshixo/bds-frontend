const fetchContacts = async () => {
  const data = await fetch("http://localhost:5000/contacts");
  const parsedData = await data.json();
  return parsedData;
};
export default fetchContacts;
