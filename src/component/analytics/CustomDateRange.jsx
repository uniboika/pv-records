import React from "react";
import { FormGroup, Input, Row, Col, Button, ButtonGroup } from "reactstrap";
import moment from "moment";
import { Label } from "recharts";

export default function CustomDateRange({
  type = "",
  month = "",
  quarter = "",
  year = "",
  from = "",
  to = "",
  handleChangeDate = (f) => f,
}) {
  const dateRanges = [
    { type: "daily", label: "Daily" },
    { type: "weekly", label: "Weekly" },
    { type: "monthly", label: "Monthly" },
    { type: "quarterly", label: "Quarterly" },
    { type: "annually", label: "Annually" },
    { type: "custom", label: "Custom" },
  ];

  return (
    <Row>
      <Col md={7}>
        <ButtonGroup>
          {dateRanges.map((r) => (
            <Button
              key={r.type}
              size="lg"
              // color="secondary"
              name={"type"} // Make sure 'name' is set to the expected value
              value={r.type} // Make sure 'name' is set to the expected value
              onClick={handleChangeDate}
              color={type === r.type ? "warning" : "light"}
            >
              {r.label}
            </Button>
          ))}
        </ButtonGroup>
      </Col>
      <Col md={5} className="text-right">
        {type === "monthly" && (
          <Row>
            <Col md={6} className="offset-md-6"></Col>
            <Col md={6} className="offset-md-6">
              <div className="row">
                <div className="col-md-3 text-right d-flex align-items-center justify-content-end">
                  <em className="text-black">Month:</em>
                </div>
                <div className="col-md-9">
                  <FormGroup>
                    <Input
                      type="select"
                      name="month"
                      value={parseInt(month)}
                      onChange={handleChangeDate}
                    >
                      {moment.months().map((mon, index) => (
                        <option
                          selected={month === index + 1}
                          key={index}
                          value={index + 1}
                        >
                          {mon}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {type === "quarterly" && (
          <Row className="d-flex mx-0 px-0 flex-direction-row justify-content-between">
            <Col md={6}>
              <div className="row">
                <div className="col-md-3 text-right d-flex align-items-center justify-content-end">
                  <em className="text-black">Year:</em>
                </div>
                <div className="col-md-9">
                  <FormGroup>
                    <Input
                      type="select"
                      name="year"
                      value={year}
                      onChange={handleChangeDate}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 2021 },
                        (_, index) => 2022 + index
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="row">
                <div className="col-md-3 pt-3 text-right d-flex align-items-center justify-content-end">
                  <em className="text-black">Quarter:</em>
                </div>
                <div className="col-md-9">
                  <FormGroup>
                    <Input
                      value={quarter}
                      type="select"
                      name="quarter"
                      onChange={handleChangeDate}
                    >
                      <option selected={quarter === "Q1"} value="Q1">
                        Q1
                      </option>
                      <option selected={quarter === "Q2"} value="Q2">
                        Q2
                      </option>
                      <option selected={quarter === "Q3"} value="Q3">
                        Q3
                      </option>
                      <option selected={quarter === "Q4"} value="Q4">
                        Q4
                      </option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {type === "annually" && (
          <Row>
            <Col className="offset-2 text-right" md={6}></Col>
            <Col className="offset-2 text-right" md={6}>
              <div className="row">
                <div className="col-md-3 pt-3 text-right d-flex align-items-center justify-content-end">
                  <em className="text-black">Year:</em>
                </div>
                <div className="col-md-9">
                  <FormGroup>
                    <Input
                      type="select"
                      name="year"
                      value={year}
                      onChange={handleChangeDate}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 2021 },
                        (_, index) => 2022 + index
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {["custom", "daily", "weekly"].includes(type) && (
          <Row className="d-flex mx-0 px-0 flex-direction-row justify-content-between">
            <Col md={6} className="text-left">
              <div
                className="row "
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="col-md-3 pt-5 mt-5 text-right d-flex align-items-center justify-content-end">
                  <em className="text-black">From:</em>
                </div>
                <div className="col-md-9">
                  <FormGroup>
                    <Input
                      type="date"
                      value={from}
                      name="to"
                      onChange={handleChangeDate}
                    />
                  </FormGroup>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-left">
              <div
                className="row"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="col-md-3 text-right d-flex align-items-center justify-content-end">
                  <em className="text-black">To:</em>
                </div>
                <div className="col-md-9">
                  <FormGroup>
                    <Input
                      type="date"
                      value={to}
                      name="to"
                      onChange={handleChangeDate}
                    />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
