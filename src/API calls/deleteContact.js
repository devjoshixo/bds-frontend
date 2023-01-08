const deleteIndividual = async (id) => {
  const promise = await fetch(`http://localhost:5000/contacts/delete/${id}`, {
    method: "DELETE",
  });
  return promise;
};
export default deleteIndividual;
