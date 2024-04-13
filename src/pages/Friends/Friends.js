import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../Navbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import axios from "axios";

const Friends = () => {
  const usenavigate = useNavigate();
  const [customerlist, listupdate] = useState(null);
  const currentDate = dayjs();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/users"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  console.log(sessionStorage.getItem("username"));
  // const data = [
  //   {
  //     name: "Dune",
  //     author: "Frank Herbert",
  //     year: "1965",
  //   },
  //   {
  //     name: "Ender's Game",
  //     author: "Orson Scott Card",
  //     year: "1985",
  //   },
  //   {
  //     name: "The Hitchhiker's Guide to the Galaxy",
  //     author: "Douglas Adams",
  //     year: "1979",
  //   },
  //   {
  //     name: "1984",
  //     author: "George Orwell",
  //     year: "1949",
  //   },
  //   {
  //     name: "Brave New World",
  //     author: "Aldous Huxley",
  //     year: "1932",
  //   },
  // ];
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-600">
        Бараа жагсаалт
      </h1>
      <DatePicker defaultValue={currentDate} format={dateFormat} />
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="shortname" header="Code"></Column>
        <Column field="user_info" header="Name"></Column>
        <Column field="userid" author="author"></Column>
        <Column field="username" header="year"></Column>
      </DataTable>
    </>
  );
};

export default Friends;
