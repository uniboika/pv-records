import React, { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import Header from "../dashboard/Header";
import { Button, Label, ButtonGroup } from "reactstrap";
import CustomTable from "../../reusablecomponent/CustomTable.jsx";
import { _get, separator, _delete, _put } from "../../Helper";
import {} from "reactstrap";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import SummaryCard from "../../reusablecomponent/SummaryCard.jsx";
import PvPdf from "./PVPDF.js";
import { PDFViewer } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";

export default function Analytics() {
  const currentDate = dayjs();
  const firstDay = currentDate.format("D") - 1;
  const initialFromDate = currentDate.subtract(firstDay, "day");
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(currentDate);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("select-all");
  const [loading, setLoading] = useState(false);
  const [searchQueary, setSearchQueary] = useState("");
  const [balance, setBalance] = useState(0);
  const [record, setRecord] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
  });

  const handleDateChange = (date, type) => {
    if (type === "from") {
      setFromDate(date);
    } else {
      setToDate(date);
    }
    console.log(`From: ${formattedFromDate}, To: ${formattedToDate}`);
  };
  const formattedFromDate = fromDate.format("YYYY-MM-DD");
  const formattedToDate = toDate.format("YYYY-MM-DD");

  // =================================== getReg ======================================
  const getReg = useCallback(() => {
    setLoading(true);
    _get(
      `get-balance?date_from=${formattedFromDate}&date_to=${formattedToDate}`,
      (resp) => {
        if (resp.success) {
          setBalance(resp.data[0].total_amount);
          setRecord(resp.data[0].record_count);
        }
      }
    );
    _get(
      `get-record?query_type=${query}&name=${filter}&date_from=${formattedFromDate}&date_to=${formattedToDate}`,
      (resp) => {
        setLoading(false);
        if (resp.success) {
          setData(resp.data);
          // console.log(resp.data);
        }
      }
    );
  }, [query, filter, editData, formattedFromDate, formattedToDate, editForm]);

  useEffect(() => {
    getReg();
  }, [getReg]);

  // ================================= deleteModal Editmodal ==================================
  const deleteModal = (id) => {
    setModal(!modal);
    setRecordId(id);
  };
  const editModal = (id, description, amount) => {
    setModalEdit(!modalEdit);
    setRecordId(id);
    setEditForm({ description: description, amount: amount });
  };

  // ============================== HandleDelete handleEdit ==================================
  const handleDelete = (id) => {
    _delete(`delete-record?query_type=delete`, { pv_no: id }, (resp) => {
      if (resp.success) {
        getReg();
      }
    });
    setModal(!modal);
  };
  const handleEdit = (id, form) => {
    editModal();
    _put(`update-record?query_type=update`, { pv_no: id, ...form }, (resp) => {
      if (resp.success) {
        console.log("Record updated successfully!");
        setEditData(resp.data[0]);
      } else {
        console.log("An error occurred while updating the record.");
      }
    });
    console.log(editData);
  };

  // ================================== HandleSearch ==================================
  const handleSearch = data
    ? data.filter(
        (item) =>
          item.payee &&
          item.payee
            .toLowerCase()
            .includes(searchQueary && searchQueary.toLowerCase())
      )
    : ["can't find any data"];
  const handleSearchQuearyChange = (e) => {
    setSearchQueary(e.target.value);
  };

  // =================================== HandleChange =======================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
    setEditData({ ...editData, [name]: value });
  };

  // ================================ PDFprint ==========================================
  const [print, setPrint] = useState(false);
  const handlePrint = () => {
    setPrint(!print);
  };

  // ================================  DateRangePicker  ===================================
  // const handleStartDateChange = (date) => {
  //   setStartDate(date);
  //   if (endDate && date) {
  //     fetchData(date, endDate);
  //   }
  // };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  //   if (startDate && date) {
  //     fetchData(startDate, date);
  //   }
  // };

  // const fetchData = (start, end) => {
  //   const startMonth = dayjs(start).month();
  //   const startYear = dayjs(start).year();
  //   const endMonth = dayjs(end).month();
  //   const endYear = dayjs(end).year();
  //   console.log(
  //     `Fetching data from ${startYear}/${startMonth + 1} to ${endYear}/${
  //       endMonth + 1
  //     }`
  //   );
  // };

  return (
    <>
      <Header header="Analytics" />
      <br />
      <br />
      <br />
      {print ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <PvPdf data={data} />
        </PDFViewer>
      ) : (
        <>
          <div className="container">
            {/* {JSON.stringify()} */}
            <div className="d-flex justify-content-between mb-3">
              <div>
                <Label for="fromDate">From</Label> <br />
                <DatePicker
                  value={fromDate}
                  onChange={(date) => handleDateChange(date, "from")}
                  renderInput={(props) => <TextField {...props} />}
                />
              </div>
              <div>
                <Label for="toDate">To</Label> <br />
                <DatePicker
                  value={toDate}
                  onChange={(date) => handleDateChange(date, "to")}
                  renderInput={(props) => <TextField {...props} />}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <SummaryCard
                title="Monthly Balance"
                balance={balance}
                comparison={10} // Example percentage change
                currentDate={currentDate.format("DD/MM/YYYY")}
              />
              <SummaryCard
                title="Total Records"
                balance={record}
                comparison={-5} // Example percentage change
                currentDate={currentDate.format("DD/MM/YYYY")}
              />
            </div>
            {/* {JSON.stringify(data)} */}
            <Button style={{ textDecoration: "none" }}>
              <CSVLink
                data={handleSearch && handleSearch ? handleSearch : []}
                className="text-white text-decoration-none"
                filename={`Pv Records`}
              >
                Download to Excel
              </CSVLink>
            </Button>

            <Button onClick={handlePrint}>Print PDF</Button>
            <CustomTable
              handleSearch={handleSearch}
              deleteModal={deleteModal}
              editModal={editModal}
              handleChange={handleChange}
              editForm={editForm}
              modalEdit={modalEdit}
              modal={modal}
              recordId={recordId}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              record={record}
              separator={separator}
              setSearchQuery={handleSearchQuearyChange}
            />
          </div>
        </>
      )}
    </>
  );
}
