const fetchCustomFields = async () => {
  const data = await fetch("http://localhost:5000/contacts/customfield");
  return data.json();
};
export default fetchCustomFields;
