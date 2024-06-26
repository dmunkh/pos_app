import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../UI/Toast/Toast";
import dayjs from "dayjs";
import {
  DatePicker,
  Spin,
  Modal,
  InputNumber,
  Input,
  Select,
  Space,
} from "antd";
import styles from "../pages/Login/Login.module.css";

import _ from "lodash";
import { MdFrontHand } from "react-icons/md";

const SignUp = (props) => {
  const { Option } = Select;
  const [count, setcount] = useState(0);
  const [boxcount, setboxcount] = useState(0);
  const [baraa_id, setBaraa_id] = useState();
  const [baraa, setbaraa] = useState();
  const [unit, setunit] = useState("ш");
  const [price, setprice] = useState(0);
  const [date, setdate] = useState(dayjs());

  const [baraa_list, setBaraa_list] = useState();
  //   const [formData, setFormData] = useState({
  //     count: 0,
  //     count_box: 0,
  //   });

  // const [message, setMessage] = useState("");
  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (formData.count.trim().length === 0) {
      // setMessage("all fields are required.");
      setToast({
        showToast: true,
        message: "Тоо ширхэг оруулна уу",
        type: "danger",
      });
      return;
    } else {
      try {
        const response = axios.post(
          "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance",
          { id: count, baraa_ner: "banana", company_name: "Orgil" }
        );
        console.log("return", response.data);
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance"
            );
            console.log("data", response.data);
          } catch (error) {}
        };

        fetchData();
      } catch (error) {}
    }
    // setMessage("");
    setToast({
      showToast: false,
      message: "",
      type: "",
    });

    // console.log("FORM DATA ", formData);
  };

  const handleClick = () => {
    console.log(
      "INSERTING",
      // baraa[0].company_name,
      dayjs(date).format("YYYY"),
      dayjs(date).format("M")
    );

    try {
      console.log("try to insert");
      const response = axios.post(
        "http://192.168.1.16:5000/api/backend/balance",
        {
          baraa_ner: "Ачит ихт Өгөөж",
          type_id: 1,

          // id: 999,
          // order_num: 0,
          // delguur_id: 0,
          // delguur_ner: "",
          // baraa_id: 1,
          // baraa_ner: "Alim banana",
          // company_name: "",
          // company_id: "",
          count: count,
          // box_count: "9",
          // type_id: 1,
          unit: unit,
          price: price,
          register_date: dayjs(date).format("YYYY-MM-DD"),
          // id: count,
          // order_num: 0,
          // delguur_id: 0,
          // delguur_ner: "",
          // baraa_id: baraa[0].id,
          // baraa_ner: baraa[0].baraa_ner,
          // company_name: baraa[0].company_name,
          // company_id: baraa[0].company_id,
          // count: count,
          // box_count: boxcount,
          // type: 1,
          // unit: unit,
          // une: baraa[0].une,
          // year: dayjs(date).format("YYYY"),
          // month: dayjs(date).format("M"),
          // day: dayjs(date).format("DD"),
        }
      );
      console.log("return", response.data);
      // const fetchData = async () => {
      //   try {
      //     const response = await axios.get(
      //       "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance"
      //     );
      //     console.log("data", response.data);
      //   } catch (error) {}
      // };

      // fetchData();
    } catch (error) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/baraa"
        );
        console.log("data", response.data);

        setBaraa_list(_.orderBy(response.data, ["id"]));
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-50 ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-lg font-extrabold text-gray-900">
            Орлого бүртгэл
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Огноо</div>
              <div className="w-3/4">
                <DatePicker
                  className="w-full"
                  value={dayjs(date)}
                  onChange={(date) => setdate(date)}
                />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Бараа</div>
              <div className="w-3/4">
                <Select
                  showSearch
                  allowClear
                  placeholder="Сонгоно уу."
                  optionFilterProp="children"
                  className="w-full"
                  onChange={(value) => {
                    console.log(
                      value,
                      _.filter(baraa_list, (a) => a.id === value)
                    );
                    setbaraa(_.filter(baraa_list, (a) => a.id === value));
                  }}
                >
                  {_.map(baraa_list, (item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.company_name +
                        " - " +
                        item.baraa_ner +
                        " - " +
                        item.une}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Тоо ширхэг</div>
              <InputNumber
                value={count}
                onChange={(value) => setcount(value)}
              />
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Нэгж үнэ</div>
              <InputNumber
                value={price}
                onChange={(value) => setprice(value)}
              />
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Хэмжих нэгж</div>
              <div className="w-3/4">
                <Select
                  showSearch
                  allowClear
                  placeholder="Сонгоно уу."
                  optionFilterProp="children"
                  className="w-full"
                  value={unit}
                  onChange={(value) => setunit(value)}
                >
                  <Option key={"ш"} value={"ш"}>
                    ш
                  </Option>
                  <Option key={"кг"} value={"кг"}>
                    кг
                  </Option>
                  <Option key={"л"} value={"л"}>
                    л
                  </Option>
                </Select>
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Хайрцаг</div>
              <div className="w-3/4">
                <InputNumber
                  value={boxcount}
                  onChange={(value) => setboxcount(value)}
                />
              </div>
            </div>
          </div>

          <div className="p-1">
            <button
              onClick={handleClick}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Бүртгэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
