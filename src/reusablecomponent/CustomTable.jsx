import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function CustomTable({
  searchQuery,
  setSearchQuery,
  handleSearch,
  separator,
  deleteModal,
  modal,
  handleDelete,
  recordId,
  editModal,
  modalEdit,
  handleChange,
  editForm,
  handleEdit,
})  {
  return (
    <div className="card shadow-sm m-2 dashboard-table">
      <div className="card-body">
        {" "}
        <div className="d-flex justify-content-between">
          <h5 className="card-title pb-3">Records</h5>
          <div className="search-box mb-3">
            <input
              type="search"
              onChange={setSearchQuery}
              value={searchQuery}
              className="form-control w-100"
              placeholder="Search Payee"
            />
            <span onClick={setSearchQuery} className="search-icon">
              <IoCloseSharp />
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
                  <td style={{textTransform: "capitalize"}}>{pv.payee}</td>
                  <td>{pv.date}</td>
                  <td className="text-align-right">{separator(pv.amount)}</td>
                  <td style={{textTransform: "capitalize"}}>{pv.description}</td>
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
        <div className="d-flex justify-content-between">
          <Button>Previous</Button>
          <Button
            className={`today === ${new Date()} ? visibility: hidden : null`}
          >
            Next
          </Button>
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
              Save
            </Button>{" "}
            <Button color="secondary" onClick={editModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

