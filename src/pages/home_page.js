import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import welcome_img from "../assets/wlcome.gif";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdExit } from "react-icons/io";

const HomePage = () => {
  const theme = "dark";
  const dark = "#18222e";
  const light = "#ffffff";
  const dark_font = "#ffffff";
  const light_font = "#18222e";
  const navTo = useNavigate();

  return (
    <Flex
      bg={theme === "dark" ? dark : "white"}
      color={!(theme === "dark") ? dark : light}
      minH={"100vh"}
      flexDir={"column"}
      p={5}
    >
      <Image
        p={"10% 20%"}
        h={{ base: "40vh", lg: "80vh" }}
        w={"100%"}
        src={welcome_img}
      />
      <Flex w={"100%"} justifyContent={"center"}>
        <Button
          colorScheme="red"
          color={"white"}
          w={"20%"}
          onClick={() => {
            navTo("/");
            toast("Logged Out", {
              icon: (
                <Box color={"orange"}>
                  <IoMdExit />
                </Box>
              ),
              style: {
                borderRadius: "10px",
                background: theme === "dark" ? dark : light,
                boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                color: !(theme === "dark") ? dark : light,
              },
            });
          }}
        >
          LogOut
        </Button>
      </Flex>{" "}
    </Flex>
  );
};

export default HomePage;
