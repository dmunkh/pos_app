import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Toast from "../../UI/Toast/Toast";
import useBearStore from "../../state/state";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [customerlist, listupdate] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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

  // useEffect(() => {
  //   sessionStorage.clear();

  //   fetch(
  //     "https://9xz5rjl8ej.execute-api.us-east-1.amazonaws.com/production/users"
  //   )
  //     .then((res) => {
  //       console.log(res.json(), res);
  //       return res.json();
  //     })
  //     .catch((err) => {
  //       console.log(err.messsage);
  //     });
  // }, []);

  // const [message, setMessage] = useState("");
  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    type: "",
  });

  const onChange = (e) => {
    setFormData((prev) => {
      let helper = { ...prev };
      helper[`${e.target.id}`] = e.target.value;
      return helper;
    });
  };

  const navigate = useNavigate();
  const setIsUserValid = useBearStore((state) => state.setIsUserValid);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (formData.username.length < 4) {
      // setMessage("username or email should atleast be 4 characters long.");
      setToast({
        showToast: true,
        message: "username or email should atleast be 4 characters long.",
        type: "danger",
      });
      return;
    } else if (formData.password.length < 8) {
      // setMessage("password should atleast be 8 characters long.");
      setToast({
        showToast: true,
        message: "password should atleast be 8 characters long.",
        type: "danger",
      });
      return;
    }
    // setMessage("");
    setToast({
      showToast: false,
      message: "",
      type: "",
    });

    console.log("FORM DATA ", formData);

    const dbUsername = "test";
    const dbPassword = "test1@23";

    if (formData.username === dbUsername && formData.password === dbPassword) {
      setIsUserValid(true);
      navigate("/profile");
      // true
      // "/profile"
    } else {
      setToast({
        showToast: true,
        message: "invalid username or password.",
        type: "danger",
      });
    }
  };

  return (
    <div className={styles["main"]}>
      <form className={styles["form"]} onSubmit={onSubmitHandler}>
        <div className={styles["user-image"]}>
          <div className={styles["head"]} />
          <div className={styles["body"]} />
        </div>
        <p className={styles["heading"]}>Login</p>
        <div className={styles["inputs-div"]}>
          <input
            onChange={onChange}
            value={formData.username}
            type={"text"}
            id="username"
            name="username"
            placeholder="username or email"
          />
          <input
            onChange={onChange}
            value={formData.password}
            type={"password"}
            id="password"
            name="password"
            placeholder="password"
          />
          <button>submit</button>
          {/* <div className={styles["err-msg-div"]}>{message}</div> */}
        </div>

        <p className={styles["p-link"]}>
          New User?{" "}
          <Link to={"/signup"} className={styles["link"]}>
            sign up
          </Link>
        </p>
      </form>
      {toast.showToast ? (
        <Toast setToast={setToast} message={toast.message} type={toast.type} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
