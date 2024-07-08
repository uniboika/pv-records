import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../image/logo.png";
import formatNumber from "../../reusablecomponent/FormatNumber";
import Header from "../dashboard/Header";

export default function PvPdf({ data }) {

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: "#fff",
      fontSize: 12,
      width: "100px",
    },
    image: {
      width: 100,
      height: "auto",
    },
    header: {
      marginBottom: 20,
      textAlign: "center",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "16.66%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
      textTransform: "capitalize",
    },
  });

  // const data = [
  //   {
  //     description: "food",
  //     pv_no: 100,
  //     date: "3-10-2024",
  //     payee: "nazif",
  //     amount: 200,
  //   },
  //   {
  //     description: "data",
  //     pv_no: 200,
  //     date: "3-10-2024",
  //     payee: "abdull",
  //     amount: 500,
  //   },
  //   {
  //     description: "ac",
  //     pv_no: 300,
  //     date: "3-10-2024",
  //     payee: "ahmad",
  //     amount: 900,
  //   },
  // ];

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.image} />
          <Text>BRAINSTORM IT SOLUTION LTD</Text>
          <Text>PV REGISTER</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>SN</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DESCRIPTION</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PV NO.</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DATE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PAYEE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>AMOUNT</Text>
            </View>
          </View>
          {data?.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.pv_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.payee}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{ margin: 5, fontSize: 10, textAlign: "right" }}
                  className="text-center"
                >
                  {formatNumber(item.amount)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
{
  /* <View style={styles.tableRow}>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>1</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>test</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>test</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>test</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>test</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>test</Text>
  </View>
</View>; */
}
