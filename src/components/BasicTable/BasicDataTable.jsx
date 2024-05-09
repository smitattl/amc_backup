import React, { useEffect, useMemo, useState } from "react";
import "./BasicDataTable.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ApiInterface } from "../../API";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BasicTable = ({ columns }) => {
  const { pathname } = useLocation();
  const { arnValuesForCustomer, selectVasType, indexTAT } = useSelector(
    (state) => state.customer
  );
  const { arnValues, vasType } = useSelector((state) => state.homeApi);
  const [fleetData, setFleetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const TotalFleetDeatiled = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      if (pathname.includes("/Home")) {
        formData.append("arn_no", arnValuesForCustomer);
      } else if (pathname.includes("/admin")) {
        pathname.append("arn_no", arnValuesForCustomer);
      }
      formData.append("vas_type", selectVasType.value);
      const response = await ApiInterface.getTotalFleetDetailsData(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  const TotalFleetDeatiledForAdmin = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      formData.append("vas_type", vasType.value);
      const response = await ApiInterface.getTotalFleetDetailsData(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  const FleetDataHandler = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("arn_no", arnValuesForCustomer);
      formData.append("vas_type", selectVasType.value);
      formData.append("Clickindex", indexTAT);
      const response = await ApiInterface.getFleetTatDetails(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const FleetDataHandlerForAdmin = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      formData.append("vas_type", vasType.value);
      formData.append("Clickindex", indexTAT);
      const response = await ApiInterface.getFleetTatDetails(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pathname.includes("/Home")) {
      if (columns.length === 6) {
        TotalFleetDeatiled();
      } else if (columns.length === 11) {
        FleetDataHandler();
      }
    } else if (pathname.includes("/admin")) {
      if (columns.length === 6) {
        TotalFleetDeatiledForAdmin();
      } else if (columns.length === 11) {
        FleetDataHandlerForAdmin();
      }
    }
  }, [pathname, columns]);

  return (
    <div>
      <div
        className="table-responsive"
        style={{ overflow: "scroll", height: "370px" }}
      >
        <table
          id="fleet-table"
          className="fleet-table table table-striped table-bordered no-footer dataTable table-responsive"
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.title}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fleetData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BasicTable;
