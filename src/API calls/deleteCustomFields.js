const deleteContact = async (id) => {
  var option = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };
  const promise = await fetch(
    `http://localhost:5000/contacts/customfield/delete`,
    option
  );
  return promise;
};
export default deleteContact;