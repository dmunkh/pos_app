import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../UI/Toast/Toast";
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

const SignUp = (props) => {
  const { Option } = Select;
  const [count, setcount] = useState(0);
  const [baraa, setBaraa] = useState();
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
    console.log("INSERTING");
    try {
      const response = axios.post(
        "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/balance",
        { id: count, baraa_id: 3, baraa_ner: "banana", company_name: "Orgil" }
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

        setBaraa(_.orderBy(response.data, ["id"]));
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
              <div className="w-1/4">Бараа</div>
              <div className="w-3/4">
                <Select
                  showSearch
                  allowClear
                  placeholder="Сонгоно уу."
                  optionFilterProp="children"
                  className="w-full"
                >
                  {_.map(baraa, (item) => (
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
              <div className="w-1/4">Хэмжих нэгж</div>
              <div className="w-3/4">
                <Select
                  showSearch
                  allowClear
                  placeholder="Сонгоно уу."
                  optionFilterProp="children"
                  className="w-full"
                  value={1}
                >
                  <Option key={1} value={1}>
                    ш
                  </Option>
                  <Option key={2} value={2}>
                    кг
                  </Option>
                  <Option key={3} value={3}>
                    л
                  </Option>
                </Select>
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Хайрцаг</div>
              <div className="w-3/4">
                <InputNumber
                  value={count}
                  onChange={(value) => setcount(value)}
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
