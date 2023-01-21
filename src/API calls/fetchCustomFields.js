const fetchCustomFields = async () => {
  const data = await fetch("http://localhost:5000/contacts/customfield/");
  const parsedData = await data.json();
  return parsedData;
};
export default fetchCustomFields;
