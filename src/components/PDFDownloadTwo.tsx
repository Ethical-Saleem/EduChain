import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Demo } from "../../types";

interface ResultDocumentProps {
  record: Demo.Result;
}

// Register font
Font.register({
  family: "Lusitana",
  src: "https://fonts.gstatic.com/s/lusitana/v4/Q7EtAWlDLyjrIIFdmxKqN_esZW2xOQ-xsNqO47m55DA.ttf",
  fontWeight: "normal",
  fontStyle: "normal",
});

const ResultDocumentTwo: React.FC<ResultDocumentProps> = ({ record }) => {
  const styles = StyleSheet.create({
    page: {
      position: "relative",
      fontFamily: "Lusitana",
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.2,
      zIndex: 0,
    },
    backgroundContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    watermarkText: {
    //   position: "absolute",
      color: "#5a5a95",
      fontSize: 20,
      fontWeight: "bold",
      opacity: 0.1,
      transform: "rotate(-45deg)",
      whiteSpace: "nowrap",
    },
    watermarkContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 50,
    },
    logoRepeat: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    logoImage: {
      width: 150,
      height: 150,
      opacity: 0.2,
      margin: 20,
    },
    content: {
      margin: 40,
      zIndex: 2,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    section: {
      marginBottom: 20,
      padding: 10,
      border: "1px solid #ccc",
      backgroundColor: "transparent", // No background color
    },
    sectionTitle: {
      fontSize: 14,
      color: "#061a2b",
      marginBottom: 10,
    },
    grid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    gridItem: {
      width: "calc(33.33% - 10px)",
      marginBottom: 10,
    },
    gridItemWide: {
      width: "calc(66.66% - 10px)",
      marginBottom: 10,
    },
    label: {
      fontSize: 10,
      color: "#6b7280",
    },
    value: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#061a2b",
    },
  });

  const formatYear = (date: Date) => {
    const d = new Date(date);
    return !isNaN(d.getTime()) ? d.getFullYear() : "-";
  };
  const Watermark: React.FC = () => {
      const watermarkText = "EDUCHAIN RESULT VERIFICATION";
      const repetitions = 20; // Number of times to repeat the text
      const step = 80; // Distance between repetitions

      return (
        <View style={styles.watermarkContainer}>
          {[...Array(repetitions)].map((_, rowIndex) =>
            [...Array(repetitions)].map((_, colIndex) => (
              <Text
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.watermarkText,
                  { top: rowIndex * step, left: colIndex * step },
                ]}
              >
                {watermarkText}
              </Text>
            ))
          )}
        </View>
      );
    };

    const LogoRepeat: React.FC = () => {
        const repetitionsX = 5; // Number of repetitions in the horizontal direction
        const repetitionsY = 10; // Number of repetitions in the vertical direction
        const logoSize = 150; // Size of the logo
        const gap = 20; // Gap between the logos
      
        return (
          <View style={styles.logoRepeat}>
            {[...Array(repetitionsY)].map((_, rowIndex) =>
              [...Array(repetitionsX)].map((_, colIndex) => (
                <Image
                  key={`${rowIndex}-${colIndex}`}
                  src="/educhain-one.jpg"
                  style={[
                    styles.logoImage,
                    {
                      top: rowIndex * (logoSize + gap),
                      left: colIndex * (logoSize + gap),
                    },
                  ]}
                />
              ))
            )}
          </View>
        );
      };

    // const LogoRepeat: React.FC = () => {
    //     const repetitions = 5; // Number of repetitions in each direction
    //     const step = 200; // Distance between repetitions
      
    //     return (
    //       <View style={styles.logoRepeat}>
    //         {[...Array(repetitions)].map((_, rowIndex) =>
    //           [...Array(repetitions)].map((_, colIndex) => (
    //             <Image
    //               key={`${rowIndex}-${colIndex}`}
    //               src="/educhain-one.jpg"
    //               style={[
    //                 styles.logoImage,
    //                 { top: rowIndex * step, left: colIndex * step },
    //               ]}
    //             />
    //           ))
    //         )}
    //       </View>
    //     );
    //   };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <LogoRepeat />
        <Watermark />
        <View style={styles.content}>
          <View style={styles.header}>
            <Image src={record.school?.logoUrl} style={styles.logo} />
            <Text style={styles.title}>
              {record.surname?.toUpperCase() + " " + record.otherNames}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Student No.:</Text>
                <Text style={styles.value}>{record.studentNumber}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>
                  {record.email ? record.email : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Phone Number:</Text>
                <Text style={styles.value}>
                  {record.phoneNumberOne ? record.phoneNumberOne : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Mobile Number:</Text>
                <Text style={styles.value}>
                  {record.phoneNumberTwo ? record.phoneNumberTwo : "-"}
                </Text>
              </View>
              <View style={styles.gridItemWide}>
                <Text style={styles.label}>Street Address:</Text>
                <Text style={styles.value}>
                  {record.streetAddress ? record.streetAddress : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>City:</Text>
                <Text style={styles.value}>
                  {record.city ? record.city : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>State:</Text>
                <Text style={styles.value}>
                  {record.state ? record.state : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Country:</Text>
                <Text style={styles.value}>
                  {record.country ? record.country : "-"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>School Details</Text>
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>School Name:</Text>
                <Text style={styles.value}>
                  {record.school?.name ? record.school?.name : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                  {record.school?.address ? record.school?.address : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>State/Region:</Text>
                <Text style={styles.value}>
                  {record.school?.region ? record.school?.region : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>
                  {record.school?.email ? record.school?.email : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Telephone:</Text>
                <Text style={styles.value}>
                  {record.school?.telephone ? record.school?.telephone : "-"}
                </Text>
              </View>
            </View>
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Degree:</Text>
                <Text style={styles.value}>
                  {record.degree ? record.degree : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Grade:</Text>
                <Text style={styles.value}>
                  {record.grade ? record.grade : "-"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Year of Graduation:</Text>
                <Text style={styles.value}>
                  {record.yearOfGrad ? formatYear(record.yearOfGrad) : "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResultDocumentTwo;
