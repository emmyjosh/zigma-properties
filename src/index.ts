/** @format */

import axios from "axios";

const main = async () => {
  const res = await axios.get("http://localhost:5000/api/projects");
  console.log(res.data);
};

main();
