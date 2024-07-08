import React from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function CustomCard({
  title = "",
    balance = {},
    currentDate = {},
    footer = "",
}) {
  return (
    <div>
      <div className="card shadow-sm p-4 dashboard mb-3">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-8">
            <h5 className="card-title text-primary mb-3">{title}</h5>
            <div className="amount text-dark">
              <h4>{balance}</h4>
              <p className="">on date {currentDate}</p>
            </div>
            <div className="footer">
              <Link to="/analytics">{footer}</Link>
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
  );
}
