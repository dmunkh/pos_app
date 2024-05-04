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
  const [delguur_ner, setdelguur_ner] = useState("");
  const [hayag, sethayag] = useState("");
  const [utas, setutas] = useState("");
  const [register, setregister] = useState("");
  const [dans, setdans] = useState("");

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
    console.log("INSERTING");

    try {
      const response = axios
        .post(
          "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/delguur",
          {
            id: props.id + 1,
            delguur_ner: delguur_ner,
            utas: utas,
            hayag: hayag,
            dan: dans,
            register: register,
          }
        )
        .then();
      console.log("return", response);
    } catch (error) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/delguur"
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
            Бараа бүртгэл /{props.id}/
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Дэлгүүр нэр</div>
              <div className="w-3/4">
                {" "}
                <Input
                  value={delguur_ner}
                  onChange={(e) => setdelguur_ner(e.target.value)}
                />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Хаяг</div>
              <div className="w-3/4">
                <Input
                  value={hayag}
                  onChange={(e) => sethayag(e.target.value)}
                />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Утас</div>
              <div className="w-3/4">
                <Input value={utas} onChange={(e) => setutas(e.target.value)} />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Данс</div>
              <div className="w-3/4">
                <InputNumber
                  value={dans}
                  onChange={(value) => setdans(value)}
                />
              </div>
            </div>
            <div className="flex p-1 gap-2">
              <div className="w-1/4">Регистер</div>
              <div className="w-3/4">
                <InputNumber
                  value={register}
                  onChange={(value) => setregister(value)}
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
