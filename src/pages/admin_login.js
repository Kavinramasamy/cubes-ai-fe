import { Button, Flex, Image, Input, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import vr_bg from "../assets/vr_bg.jpg";
import logo_light from "../assets/mini_logo.png";
import logo_dark from "../assets/mini_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";

const AdminLogin = () => {
  // Navigation
  const navTo = useNavigate();
  const api_link = "https://cubes-ai-api.vercel.app/";
  const theme = "dark";
  const dark = "#18222e";
  const light = "#ffffff";
  const dark_font = "#ffffff";
  const light_font = "#18222e";

  const [load, setLoad] = React.useState(false);

  const fieldValidationSchema = yup.object({
    email: yup.string().required("please enter a valid mail"),
    password: yup.string().required("please enter a valid password"),
  });
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    ValidationSchema: fieldValidationSchema,
    onSubmit: async (logininfo) => {
      try {
        setLoad(true);
        const credential = {
          admin_email: logininfo.email,
          admin_password: logininfo.password,
        };
        await axios
          .post(`${api_link}login`, credential)
          .then((res) => {
            toast.success("Login Success", {
              style: {
                borderRadius: "10px",
                background: theme === "dark" ? dark : light,
                boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                color: !(theme === "dark") ? dark : light,
              },
            });
            localStorage["cunes-ai-solution-token"] = res.data.token;
            navTo("/home");
            setLoad(false);
          })
          .catch((error) => {
            toast.error("Invalid Credential");
            setLoad(false);
            console.log("Error", error);
          });
      } catch (errors) {
        toast.error("Try Again");
        console.log("Error", errors);
        setLoad(false);
      }
    },
  });

  return (
    <Flex
      bg={theme === "dark" ? dark : "white"}
      color={!(theme === "dark") ? dark : light}
      minH={"100vh"}
    >
      <Flex
        w={{ base: "100vw", lg: "35vw" }}
        p={10}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Image
          src={!(theme === "dark") ? logo_dark : logo_light}
          alt="logo"
          h={"10vh"}
        />
        <Stack p={3} />
        <form className="w-100" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            pr="4.5rem"
            type="email"
            placeholder="E-mail"
            borderColor={
              errors.email ? "red" : !(theme === "dark") ? dark : light
            }
            _focus={{ boxShadow: "0 0 0 0px pink", borderColor: "#808080" }}
            required={true}
            onChange={handleChange}
            value={values.email}
          />
          <Stack p={3} />
          {/* <InputGroup size="md"> */}
          <Input
            id="password"
            name="password"
            pr="4.5rem"
            type={"password"}
            placeholder="Password"
            borderColor={
              errors.password ? "red" : !(theme === "dark") ? dark : light
            }
            _focus={{ boxShadow: "0 0 0 0px pink", borderColor: "#808080" }}
            required={true}
            onChange={handleChange}
            value={values.password}
          />
          {/* <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShow} bg={"ghost"}>
                {!show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement> */}
          {/* </InputGroup> */}
          <Stack p={3} />
          <Flex w={"100%"} justifyContent={"center"}>
            <Button
              colorScheme="orange"
              color={"white"}
              w={"30%"}
              type="submit"
              isLoading={load}
            >
              Login
            </Button>
          </Flex>
        </form>
        <Stack p={3} />
        <NavLink to={"/signup"}>
          {" "}
          Don`t have an account -{" "}
          <u>
            <i>SignUp</i>
          </u>
        </NavLink>
      </Flex>
      <Flex
        w={{ base: "", lg: "65vw" }}
        bg={theme === "dark" ? dark : light}
        display={{ base: "none", lg: "block" }}
      >
        <Image
          src={vr_bg}
          alt="vr_background"
          h={"100%"}
          w={"100%"}
          opacity={0.9}
        />
      </Flex>
    </Flex>
  );
};

export default AdminLogin;
