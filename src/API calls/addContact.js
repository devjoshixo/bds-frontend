const addContact = async (contact) => {
  var stat = await fetch("http://localhost:5000/contacts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return stat.status;
};

export default addContact;
