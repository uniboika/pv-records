import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PVPDF from "../analytics/PVPDF";
import Header from "../dashboard/Header";

export default function Wallets() {
  return (
    <>
      <Header header="Wallets" />
      <br />
      <br />
      <br />
      <PDFViewer>
        <PVPDF />
      </PDFViewer>
    </>
  );
}
