/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface OverviewCardProps {
  weatherApiData: any;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ weatherApiData }) => {
  const currDate = new Date().toLocaleDateString();
  const [currTime, setCurrTime] = useState("");
  const dayOfWeek = new Date().toLocaleString("en-us", { weekday: "long" });

  //  const currrTime = new Date().toLocaleTimeString();

  const updateTime = () => {
    setTimeout(() => {
      const time = new Date().toLocaleTimeString();
      setCurrTime(time);
    }, 1000);
  };

  const kelvinToCelsius = (kelvin: any) => (kelvin - 273.15).toFixed(0);

  useEffect(() => {
    updateTime();
  }, [currTime]);
  return (
    <>
      <Stack height="100%">
        <Stack direction="row" justifyContent="end" sx={{ color: "#fff" }}>
          <Stack direction="column" alignItems="end" p={3}>
            <Typography fontSize="28px" fontWeight="600">
              {weatherApiData?.name}
            </Typography>
            <Typography fontSize="18px">
              {weatherApiData?.sys?.country}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="end"
          sx={{ flexGrow: 1, color: "#fff" }}
          p={3}
          justifyContent="space-between"
        >
          <Stack direction="column" justifyContent="end">
            <Typography fontSize="28px">{currTime}</Typography>
            <Typography>
              {dayOfWeek}, {currDate}
            </Typography>
          </Stack>
          <Typography fontSize="50px">
            {weatherApiData?.main?.temp}
            <sup style={{ fontSize: "33px" }}>o</sup>C
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default OverviewCard;
