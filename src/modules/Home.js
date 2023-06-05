import React from "react";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "../components/Table";
import { validate } from "../validation";
import instance from "../api";

const Home = ({ sortKey, sortType }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ message: "" });
  const [isNoData, setIsNoData] = useState(false);

  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    getBreeds();
  }, []);

  const getBreeds = () => {
    setIsLoading(true);
    setIsError(false);
    instance
      .get("breeds", {})
      .then((res) => {
        const breeds = res.data;
        if (validate(breeds)) {
          setBreeds(breeds);
          setIsLoading(false);
          setIsNoData(false);
          setShow(true);
        } else {
          // Error in data
          setErrorMessage({ message: "Error in data" });
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error);
        setShow(false);
        setIsLoading(false);
      });
  };

  const searchBreeds = (data) => {
    setIsLoading(true);
    instance
      .get(`breeds/search?q=${data}`, {})
      .then((res) => {
        const breeds = res.data;
        setIsNoData(false);
        if (breeds.length !== 0) {
          if (validate(breeds)) {
            setShow(true);
            setBreeds(breeds);
            setIsLoading(false);
          } else {
            // Error in data
            setErrorMessage({ message: "Error in data" });
            setIsError(true);
          }
        } else {
          setShow(false);
          setIsLoading(false);
          setIsNoData(true);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
        setIsError(true);
        setShow(false);
        setIsLoading(false);
      });
  };
  const handleChange = (e) => {
    if (e.target.value === "") {
      getBreeds();
      setShow(true);
      setIsNoData(false);
    } else {
      setTimeout(
        function () {
          searchBreeds(e.target.value);
        }.bind(this),
        1000
      );
    }
  };

  const handleSort = (data) => {
    sortTable(data);
  };
  const sortTable = (data) => {
    const copybreeds = [...breeds];
    const keys = data.sortKey.split(".");
    switch (data.sortType) {
      case "asc":
        copybreeds.sort((a, b) => {
          let obj1 = a,
            obj2 = b;
          keys.forEach((key) => {
            obj1 = obj1[key];
            obj2 = obj2[key];
          });
          return obj1.localeCompare(obj2);
        });
        setBreeds(copybreeds);
        break;
      case "desc":
        copybreeds.sort((a, b) => {
          let obj1 = a,
            obj2 = b;
          keys.forEach((key) => {
            obj1 = obj1[key];
            obj2 = obj2[key];
          });
          return obj2.localeCompare(obj1);
        });
        setBreeds(copybreeds);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Breed Name"
          onChange={handleChange}
        />
      </div>
      <div className="loading">{isLoading && <LinearProgress />}</div>
      <div style={{ display: isNoData ? "block" : "none" }}>
        <h2>No result found...</h2>
      </div>
      <div style={{ display: isError ? "block" : "none" }}>
        <h2>There is an error......{errorMessage.message}</h2>
      </div>
      <div
        style={{ display: show ? "block" : "none" }}
        className="result-table"
      >
        <Table
          data={breeds}
          sortKey={sortKey}
          sortType={sortType}
          sortFunc={handleSort}
        ></Table>
      </div>
    </div>
  );
};
export default Home;
