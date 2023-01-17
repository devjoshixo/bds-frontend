const updateContact = async (data) => {
  var option = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const promise = await fetch(
    `http://localhost:5000/contacts/customfield/delete?flag=1`,
    option
  );
  return promise;
};
export default updateContact;
