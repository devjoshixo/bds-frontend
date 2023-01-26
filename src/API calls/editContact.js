const editContact = async (contact) => {
  var stat = await fetch(`http://localhost:5000/contacts/edit/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return stat.status;
};

export default editContact;
