import { useState } from "react";
import styles from "./Login.module.css";
const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setFormData((prev) => {
      let helper = { ...prev };
      helper[`${e.target.id}`] = e.target.value;
      return helper;
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (formData.username.length < 4) {
      setMessage("username or email should atleast be 4 characters long.");
      return;
    } else if (formData.password.length < 8) {
      setMessage("password should atleast be 8 characters long.");
      return;
    }
    setMessage("");

    console.log("FORM DATA ", formData);
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
            id='username'
            name='username'
            placeholder='username or email'
          />
          <input
            onChange={onChange}
            value={formData.password}
            type={"password"}
            id='password'
            name='password'
            placeholder='password'
          />
          <button>submit</button>
          <div className={styles["err-msg-div"]}>{message}</div>
        </div>

        <p className={styles["p-link"]}>
          New User? <span className={styles["link"]}>sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
