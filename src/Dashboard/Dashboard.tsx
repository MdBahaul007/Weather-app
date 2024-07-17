/* eslint-disable no-mixed-spaces-and-tabs */
import { Stack } from "@mui/material";
import React from "react";
import backGroundImage from "../assets/pexels-8moments-1183099.jpg";
import DashboardCard from "../DashboardCard/DashboardCard";

const Dashboard = () => {
  return (
    <>
      <Stack
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: `url(${backGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <DashboardCard />
      </Stack>
    </>
  );
};

export default Dashboard;
