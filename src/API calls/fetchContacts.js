const fetchContacts = async (rowstart, length) => {
  const data = await fetch(
    `http://localhost:5000/contacts?startreq=${rowstart}&endreq=${length}`
  );
  const parsedData = await data.json();
  return parsedData;
};
// import axios from "axios";
// const fetchContacts = async (rowstart, length) => {
//   var config = {
//     method: "get",
//     url: "http://localhost:5000/contacts",
//     headers: {},
//   };

//   axios(config)
//     .then(function (response) {
//       return JSON.stringify(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };
export default fetchContacts;
