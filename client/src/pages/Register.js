import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const nameRules = [
    {
      required: true,
      message: "Please input your name",
    },
  ];

  const emailRules = [
    {
      type: "email",
      message: "Please enter a valid email address",
    },
    {
      required: true,
      message: "Please input your email",
    },
  ];

  const passwordRules = [
    {
      required: true,
      message: "Please input your password",
    },
    {
      min: 6,
      message: "Password must be at least 6 characters",
    },
  ];

  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name" rules={nameRules}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={passwordRules}>
            <Input.Password />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already a user? Login
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
