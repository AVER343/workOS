import Spreadsheet from "react-spreadsheet";
import { useState } from "react";
const App = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ]);
  return <Spreadsheet data={data} onChange={setData} />;
};
