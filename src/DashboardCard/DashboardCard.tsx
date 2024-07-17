/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import DetailCard from "./DetailCard";
import axios from "axios";
import { openWeatherApiKey, openWeatherUrl } from "../constant";
import Alert from "@mui/material/Alert";

const DashboardCard = () => {
  const [apiData, setApiData]: any = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMsg, setShowErrorMessage] = useState(false);

  const fetchCityWeatherData = async (searchValue: any) => {
    console.log("searchValue", searchValue);
    try {
      const data = await axios.get(
        `${openWeatherUrl}weather?q=${searchValue}&units=metric&APPID=${openWeatherApiKey}`
      );
      setApiData(data?.data);
      setShowErrorMessage(false);
    } catch (error: any) {
      setShowErrorMessage(true);
      setErrorMessage(error?.response?.data?.message);
      console.log("errorrr", error?.response?.data?.message);
    }
  };

  const getLatLong = () => {
    try {
      return new Promise((resolve, reject) => {
        if (navigator?.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (location: any) => {
              resolve({
                lat: location?.coords?.latitude,
                long: location?.coords?.longitude,
              });
            },
            (error: any) => {
              reject("Please provide location access to mark location!");
            }
          );
        }
      });
    } catch (error) {}
  };

  const fetchDataFromLatLong = () => {
    getLatLong()?.then(async (out: any) => {
      console.log("outoutttttt", out);
      try {
        const data = await axios.get(
          `${openWeatherUrl}weather?lat=${out?.lat}&lon=${out?.long}&appid=${openWeatherApiKey}`
        );
        console.log("dataaaaaaaaa", data?.data);
        setApiData(data?.data);
      } catch (error) {
        console.log("errorrr", error);
      }
    });
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setShowErrorMessage(false);
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    fetchDataFromLatLong();
  }, []);

  return (
    <>
      <Stack width="60vw" height="85vh">
        <Card sx={{ height: "100%", backgroundColor: "transparent" }}>
          <Grid container spacing={0} sx={{ height: "100%" }}>
            <Grid item xs={8}>
              <Stack
                sx={{
                  height: "100%",
                  backgroundImage: `url("https://images.pexels.com/photos/1102915/pexels-photo-1102915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <OverviewCard weatherApiData={apiData} />
              </Stack>
            </Grid>
            <Grid item xs={4} sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
              <DetailCard
                weatherApiData={apiData}
                searchData={fetchCityWeatherData}
              />
            </Grid>
          </Grid>
        </Card>
        {showErrorMsg && (
          <Alert
            severity="error"
            onClose={() => {
              setShowErrorMessage(false);
            }}
            sx={{ marginTop: "10px", textTransform: "uppercase" }}
          >
            {errorMessage}
          </Alert>
        )}
      </Stack>
    </>
  );
};

export default DashboardCard;
