const deleteIndividual = async (id) => {
  const promise = await fetch(`http://localhost:5000/contacts/delete/${id}`, {
    method: "delete",
  });
  return promise;
};
export default deleteIndividual;
