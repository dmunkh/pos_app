import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../Navbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";

const Friends = () => {
  const usenavigate = useNavigate();
  const [customerlist, listupdate] = useState(null);
  const currentDate = dayjs();

  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";

  console.log(sessionStorage.getItem("username"));
  const data = [
    {
      name: "Dune",
      author: "Frank Herbert",
      year: "1965",
    },
    {
      name: "Ender's Game",
      author: "Orson Scott Card",
      year: "1985",
    },
    {
      name: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      year: "1979",
    },
    {
      name: "1984",
      author: "George Orwell",
      year: "1949",
    },
    {
      name: "Brave New World",
      author: "Aldous Huxley",
      year: "1932",
    },
  ];
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-600">
        Бараа жагсаалт
      </h1>
      <DatePicker defaultValue={currentDate} format={dateFormat} />
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="author" author="author"></Column>
        <Column field="year" header="year"></Column>
      </DataTable>
    </>
  );
};

export default Friends;
