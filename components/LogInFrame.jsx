import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import React, { Component } from "react";
import styles from "../styles/LogInFrame.module.css";
import react from "react";

export default function LogInFrame() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  var access = false;

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
      const { data } = await res.json();
      console.log(res.json());

      if (data.length === 0) {
        access = false;
        window.location.href = "/error";
        console.log("error");
      } else {
        access = true;
        window.location.href = "/drop/" + data.email;
      }
      return access;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    getUser();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.frame}>
      <h3>LOGIN</h3>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Input
          fluid
          label="Email : "
          placeholder="email"
          name="email"
          className={styles.IDInput}
          onChange={handleChange}
        ></Form.Input>
        <Form.Input
          fluid
          label="Password : "
          placeholder="password"
          name="password"
          type="password"
          className={styles.IDInput}
          onChange={handleChange}
        ></Form.Input>
        <Button type="submit" className={styles.SubmitButton}>
          {" "}
          Submit{" "}
        </Button>
      </Form>
    </div>
  );
}
