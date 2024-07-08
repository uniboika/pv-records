// Dashboard.js
import React from "react";
import LineChart from "./LineChart";
import "./dashboard.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect, useCallback } from "react";
import { _get, separator, _delete, _put } from "../../Helper";
import { IoSearchOutline } from "react-icons/io5";
import { FcMoneyTransfer } from "react-icons/fc";
import CustomTable from "../../reusablecomponent/CustomTable";

export default function Dashboard() {
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

  const formattedFromDate = fromDate.format("YYYY-MM-DD");
  const formattedToDate = toDate.format("YYYY-MM-DD");

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
  }, [query, filter, editData, editForm]);

  useEffect(() => {
    getReg();
  }, [getReg]);

  const deleteModal = (id) => {
    setModal(!modal);
    setRecordId(id);
  };
  const editModal = (id, description, amount) => {
    setModalEdit(!modalEdit);
    setRecordId(id);
    setEditForm({ description: description, amount: amount });
  };
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
  const handleSearch = data
    ? data.filter(
        (item) =>
          item.payee &&
          item.payee
            .toLowerCase()
            .includes(searchQueary && searchQueary.toLowerCase())
      )
    : [];
  const handleSearchQuearyChange = (e) => {
    setSearchQueary(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div>
      <Header header="Dashboard" />
      <br />
      <br />
      <br />
      <div className="px-4 pt-4">
        <div className="row m-0 p-0">
          <div className="col-md-8">
            <div className="card shadow-sm mb-3 ">
              <div className="card-body" style={{ height: "410px" }}>
                <h5 className="card-title">PV Chart</h5>
                <LineChart />
              </div>
            </div>
          </div>

          <div className="col-md-4 ">
            <div className="card shadow-sm p-4 dashboard mb-3">
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-8">
                  <h5 className="card-title text-primary mb-3">
                    Monthly Amount
                  </h5>
                  <div className="amount text-dark">
                    <h4>NGN {balance ? separator(balance) : 0}</h4>
                    <p className="">on date {formattedToDate}</p>
                  </div>
                  <div className="footer">
                    <Link to="/analytics">View Record</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-icon">
                    <FcMoneyTransfer />
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-sm p-4 dashboard mb-3">
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-8">
                  <h5 className="text-primary card-title  mb-3">
                    Monthly Record
                  </h5>
                  <div className="amount text-dark">
                    <h4>{record ? separator(record) : 0}</h4>
                    <p className="">on date {formattedToDate}</p>
                  </div>
                  <div className="footer">
                    <Link to="/analytics">View Record</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-icon">
                    <FcMoneyTransfer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card shadow-sm m-2 dashboard-table">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title pb-3">Recent Records</h5>
              <div className=" search-box mb-3">
                <input
                  type="search"
                  onChange={(e) => setSearchQueary(e.target.value)}
                  value={searchQueary}
                  className="form-control w-100"
                  placeholder="Search Payee"
                />
                <span onClick={(e) => setSearchQueary("") } className="search-icon">
                  <IoSearchOutline />
                </span>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Pv Number</th>
                    <th>Payee</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {handleSearch?.map((pv, idx) => (
                    <tr key={idx}>
                      <td>{pv.pv_no}</td>
                      <td>{pv.payee}</td>
                      <td>{pv.date}</td>
                      <td className="text-align-right">
                        {separator(pv.amount)}
                      </td>
                      <td>{pv.description}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteModal(pv.pv_no)}
                        >
                          Delete
                        </button>{" "}
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            editModal(pv.pv_no, pv.description, pv.amount)
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal isOpen={modal} toggle={deleteModal} centered={true}>
              <ModalHeader toggle={deleteModal}></ModalHeader>
              <ModalBody>Are you sure you want to delete?</ModalBody>

              <ModalFooter>
                <Button color="danger" onClick={() => handleDelete(recordId)}>
                  Delete
                </Button>{" "}
                <Button color="secondary" onClick={deleteModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit} toggle={editModal} centered={true}>
              <ModalHeader toggle={editModal}></ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="Description">Description</label>
                    <input
                      onChange={handleChange}
                      id="description"
                      name="description"
                      value={editForm.description}
                      type="text"
                      className="form-control input-pv p-3"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="Amount">Amount</label>
                    <input
                      onChange={handleChange}
                      id="amount"
                      name="amount"
                      value={editForm.amount}
                      type="number"
                      className="form-control input-pv p-3"
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="info"
                  onClick={() => handleEdit(recordId, { ...editForm })}
                >
                  Edit
                </Button>{" "}
                <Button color="secondary" onClick={editModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div> */}
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
    </div>
  );
}
