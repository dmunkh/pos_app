import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
import styles from "../Login/Login.module.css";

import _ from "lodash";
import { MdFrontHand } from "react-icons/md";

const SignUp = (props) => {
  const { Option } = Select;
  const [baraa_ner, setbaraa_ner] = useState("");
  const [boxcount, setboxcount] = useState(0);
  const [une, setune] = useState(0);
  const [baraa, setbaraa] = useState();
  const [unit, setunit] = useState("ш");
  const [date, setdate] = useState(dayjs());

  const [baraa_list, setBaraa_list] = useState();
  //   const [formData, setFormData] = useState({
  //     count: 0,
  //     count_box: 0,
  //   });

  // const [message, setMessage] = useState("");
  // const [toast, setToast] = useState({
  //   showToast: false,
  //   message: "",
  //   type: "",
  // });

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

  const handleClick = () => {
    console.log(
      "INSERTING",
      baraa[0].company_name,
      dayjs(date).format("YYYY"),
      dayjs(date).format("M")
    );

    try {
      const response = axios.post(
        "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/baraa",
        {
          id: une,
          baraa_ner: baraa_ner,
          company_name: baraa[0].company_name,
          company_id: baraa[0].company_id,
          une: une,
          box_count: boxcount,
          unit: unit,
        }
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
            Бараа бүртгэл
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Барааны нэр</div>
              <div className="w-3/4">
                {" "}
                <Input
                  value={baraa_ner}
                  onChange={(e) => setbaraa_ner(e.target.value)}
                />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Компани нэр</div>
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
                      {item.company_name + " - " + item.une}
                    </Select.Option>
                  ))}
                </Select>
              </div>
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
              <div className="w-1/4">Үнэ</div>
              <div className="w-3/4">
                <InputNumber value={une} onChange={(value) => setune(value)} />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">1 хайрцагт тоо</div>
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
