/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Divider, Input, Stack, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

interface DetailCardProps {
  weatherApiData: any;
  searchData: any;
}

const DetailCard: React.FC<DetailCardProps> = ({
  weatherApiData,
  searchData,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const kelvinToCelsius = (kelvin: any) => (kelvin - 273.15).toFixed(0);
  const weatherData = [
    {
      id: "1",
      label: "Temperature",
      value: weatherApiData?.main?.temp ?? "-",
    },
    {
      id: "2",
      label: "Humidity",
      value: weatherApiData?.main?.humidity
        ? weatherApiData?.main?.humidity + "%"
        : "-",
    },
    {
      id: "3",
      label: "Visiblity",
      value: weatherApiData?.visibility
        ? weatherApiData?.visibility + "m"
        : "-",
    },
    {
      id: "4",
      label: "Wind Speed",
      value: weatherApiData?.wind?.speed
        ? weatherApiData?.wind?.speed + "km/h"
        : "-",
    },
  ];

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      searchData(searchValue);
    }
  };

  return (
    <Stack height="100%" alignItems="center" mt="40px" color="#fff">
      {weatherApiData?.weather?.[0]?.main === "Rain" ? (
        <ThunderstormIcon sx={{ fontSize: "80px" }} />
      ) : (
        <LightModeIcon sx={{ fontSize: "80px" }} />
      )}

      <Typography mt="15px" fontSize="35px" fontWeight="500">
        {" "}
        {weatherApiData?.weather?.[0]?.main}
      </Typography>
      <Divider sx={{ bgcolor: "#fff", width: "80%", marginTop: "10px" }} />
      <Input
        id="standard-adornment-weight"
        placeholder="Search any city"
        aria-describedby="standard-weight-helper-text"
        sx={{
          borderBottom: "1px solid #fff",
          mt: "15px",
          color: "#fff",
        }}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        endAdornment={
          <>
            <SearchIcon
              onClick={() => {
                searchData(searchValue);
              }}
              sx={{ cursor: "pointer" }}
            />
          </>
        }
      />
      <Typography color="#fff" mt="20px">
        {weatherApiData?.name},{weatherApiData?.sys?.country}
      </Typography>
      <Divider
        sx={{
          bgcolor: "#FAF9F6",
          width: "90%",
          marginTop: "10px",
          fontSize: "5px",
        }}
      />
      {weatherData.map((data) => (
        <React.Fragment key={data?.id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="70%"
            mt="10px"
          >
            <Typography>{data?.label}</Typography>
            <Typography>{data?.value}</Typography>
          </Stack>
          <Divider
            sx={{
              bgcolor: "#FAF9F6",
              width: "90%",
              marginTop: "10px",
              fontSize: "5px",
            }}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default DetailCard;
