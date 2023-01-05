module.exports.getcontacts = async () => {
  await fetch("http://localhost:5000/contacts")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
