const deleteContacts = async (id) => {
  var option = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };
  await fetch(`http://localhost:5000/contacts/delete`, option);
};
export default deleteContacts;
