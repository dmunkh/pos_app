import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../Navbar";

import { Column } from "primereact/column";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  DatePicker,
  Spin,
  Modal,
  InputNumber,
  Input,
  Select,
  Space,
} from "antd";
import { FilterMatchMode } from "primereact/api";
import Swal from "sweetalert2";
import { DataTable } from "primereact/datatable";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import axios from "axios";
import MODAL from "./balance_modal";
import _ from "lodash";

const Balance = () => {
  const usenavigate = useNavigate();
  const [customerlist, listupdate] = useState(null);
  const currentDate = dayjs();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setrefresh] = useState(0);
  const [id, setid] = useState(0);
  const [search, setSearch] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const [first, set_first] = useState(0);
  const [per_page, set_per_page] = useState(50);
  const [visible, setvisible] = useState(false);

  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance"
        );
        console.log("data", response.data);

        var result = _(response.data)
          .groupBy("baraa_ner")
          .map(function (items, baraa_ner) {
            return {
              itemname: baraa_ner,
              count: _.sumBy(items, "id"),
            };
          })
          .value();

        setData(_.orderBy(result, ["id"]));
        console.log(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    console.log("INSERTING");
    try {
      const response = axios.post(
        "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance",
        { id: id, baraa_ner: "banana", company_name: "Orgil" }
      );
      setrefresh(refresh + 1);
      console.log("return", response.data);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance"
          );
          console.log("data", response.data);
          setData(response.data);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="p-5">
      <Modal
        style={{ width: "600" }}
        width={800}
        height={550}
        visible={visible}
        // visible={state.register.modal}
        // visible={true}
        onCancel={() => {
          setvisible(false);
        }}
        title={"Бүртгэл"}
        closeIcon={<div className="">x</div>}
        footer={false}
      >
        <MODAL />
      </Modal>
      <h1 className="text-sm font-bold underline text-red-600">
        Орлого зарлага
      </h1>
      <DatePicker defaultValue={currentDate} format={dateFormat} />
      <InputNumber value={id} onChange={(value) => setid(value)} />
      <button onClick={handleClick}>Post Item</button>
      <hr className="p-2" />
      <DataTable
        size="small"
        value={data}
        dataKey="id"
        filters={search}
        paginator
        scrollable
        removableSort
        rowHover
        showGridlines
        className="table-xs"
        filterDisplay="menu"
        responsiveLayout="scroll"
        sortMode="multiple"
        rowGroupMode="subheader"
        groupRowsBy="typename"
        scrollHeight={window.innerHeight - 360}
        globalFilterFields={["baraa_ner", "company_name"]}
        emptyMessage={
          <div className="text-xs text-orange-500 italic font-semibold">
            Мэдээлэл олдсонгүй...
          </div>
        }
        header={
          <div className="flex items-center justify-between border-b pb-2 mb-2  text-xs">
            <Input.Search
              className="md:w-80"
              placeholder="Хайх..."
              value={search.global.value}
              onChange={(e) => {
                let _search = { ...search };
                _search["global"].value = e.target.value;
                setSearch(_search);
              }}
            />
            <div className="flex items-center gap-3">
              {/* {checkRole(["inspection_register_add"]) && ( */}
              <>
                <div
                  title="Нэмэх"
                  className="p-1 flex items-center justify-center font-semibold text-violet-500 border-2 border-violet-500 rounded-full hover:bg-violet-500 hover:text-white hover:scale-125 focus:outline-none duration-300 cursor-pointer mr-1"
                  onClick={() => {
                    setvisible(true);
                  }}
                >
                  <i className="fa fa-plus" />
                </div>
              </>
              {/* )} */}
            </div>
          </div>
        }
        rowGroupHeaderTemplate={(data) => {
          return (
            <div className="text-xs font-semibold">
              <span> {data.typename}</span>
            </div>
          );
        }}
        // rowClassName={(data) => {
        //   var result = "cursor-pointer";
        //   if (state.id === data.id) result = " bg-blue-500 text-white";
        //   return result;
        // }}
        // onRowClick={(e) => {
        //   dispatch({ type: "STATE", data: { id: e.data.id } });
        // }}
        rows={per_page}
        first={first}
        onPage={(event) => {
          set_first(event.first);
          set_per_page(event.rows);
        }}
        paginatorTemplate={{
          layout:
            "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
          RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
              { label: 50, value: 50 },
              { label: 100, value: 100 },
              { label: 200, value: 200 },
              { label: 500, value: 500 },
            ];
            return (
              <>
                <span
                  className="text-xs mx-1"
                  style={{
                    color: "var(--text-color)",
                    userSelect: "none",
                  }}
                >
                  <span className="font-semibold">Нэг хуудсанд:</span>
                </span>
                <Select
                  size="small"
                  showSearch={false}
                  value={options.value}
                  onChange={(value) => {
                    options.onChange({
                      value: value,
                    });
                  }}
                >
                  {_.map(dropdownOptions, (item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </>
            );
          },
          CurrentPageReport: (options) => {
            return (
              <span
                style={{
                  color: "var(--text-color)",
                  userSelect: "none",
                  width: "200px",
                  textAlign: "center",
                }}
              >
                <span className="text-xs font-semibold">
                  <span>
                    {options.first} - {options.last}
                  </span>
                  <span className="ml-3">Нийт: {options.totalRecords}</span>
                </span>
              </span>
            );
          },
        }}
        paginatorClassName="justify-content-end"
      >
        <Column
          align="center"
          header="№"
          className="text-xs"
          style={{ minWidth: "40px", maxWidth: "40px" }}
          body={(data, row) => row.rowIndex + 1}
        />
        <Column
          style={{ minWidth: "60px", maxWidth: "60px" }}
          field="id"
          header="Order"
        />

        <Column
          field="company_name"
          header="Компани"
          style={{ minWidth: "120px", maxWidth: "120px" }}
        />
        <Column
          field="year"
          header="Огноо"
          style={{ minWidth: "90px", maxWidth: "90px" }}
          body={(data) => {
            return data.year && data.year + "-" + data.month + "-" + data.day;
          }}
        />
        <Column
          field="baraa_ner"
          header="Name"
          style={{ minWidth: "120px", maxWidth: "120px" }}
        />
        <Column
          field="count"
          header="Орлого"
          style={{ minWidth: "80px", maxWidth: "80px" }}
        />
        <Column
          field="box_count"
          header="Хайрцаг"
          style={{ minWidth: "90px", maxWidth: "90px" }}
        />

        <Column
          align="center"
          header=""
          className="text-xs"
          style={{ minWidth: "70px", maxWidth: "70px" }}
          headerClassName="flex items-center justify-center"
          body={(item) => {
            return (
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 flex items-center justify-center font-semibold text-green-600 rounded-full border-2 border-green-600 hover:bg-green-500 hover:scale-125 hover:text-white focus:outline-none duration-300"
                  onClick={() => {}}
                >
                  <i className="fe fe-chevrons-right" />
                </button>

                <button
                  className="p-1 flex items-center justify-center font-semibold text-yellow-500 rounded-full border-2 border-yellow-500 hover:bg-yellow-500 hover:scale-125 hover:text-white focus:outline-none duration-300"
                  onClick={() => {}}
                >
                  <i className="fe fe-edit" />
                </button>
              </div>
            );
          }}
        />
      </DataTable>
    </div>
  );
};

export default Balance;
