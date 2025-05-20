import { Document, Page, Text, StyleSheet, Font, View, Image } from '@react-pdf/renderer';
import InterRegular from "../../../assets/fonts/Inter-Regular.ttf";
import InterMedium from "../../../assets/fonts/Inter-Medium.ttf";
import InterSemiBold from "../../../assets/fonts/Inter-SemiBold.ttf";
import InterBold from "../../../assets/fonts/Inter-Bold.ttf";
import cliplabLogo from "../../../assets/cliplablogoFull.png";

// Регистрация шрифтов
Font.register({
  family: 'Inter',
  fonts: [
    { src: InterRegular, fontWeight: 'normal' },
    { src: InterMedium, fontWeight: '500' },
    { src: InterSemiBold, fontWeight: '600' },
    { src: InterBold, fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#212123",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 38,
    color: "#FFD600",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 26,
    color: "#fff",
    textAlign: "center",
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  description: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
    marginTop: 0,
    lineHeight: 1.5,
    maxWidth: 600,
    alignSelf: "center"
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  courseName: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 22,
    color: "#FFD600",
    textAlign: "center",
    marginBottom: 22,
    marginTop: 5,
    letterSpacing: 0.5,
  },
  body: {
    fontFamily: "Inter",
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 1.35,
    maxWidth: 600,
    alignSelf: "center"
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "90%",
    position: "absolute",
    bottom: 48,
    left: 36,
    right: 36,
  },
  footerText: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "Inter",
    margin: 0,
    textAlign: "left",
    paddingLeft: 12,
  },
  footerLogo: {
    width: 140,
    height: "auto",
  }
});

export default function CertificatePDF({ userName = "Иванов Иван", date = "20.05.2025" }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>Сертификат</Text>
        <Text style={styles.subtitle}>о прохождении обучающего курса</Text>
        <Text style={styles.body}>
          Настоящим удостоверяется, что
        </Text>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.body}>
          успешно прошёл(а) полный курс
        </Text>
        <Text style={styles.courseName}>«Final Cut Pro X с нуля»</Text>
        <Text style={styles.body}>
          на интерактивной платформе по обучению видеомонтажу ClipLab.
        </Text>
        <Text style={styles.description}>
          В рамках курса участник ознакомился с основами работы в Final Cut Pro X, научился монтировать видео, работать со звуком, выполнять базовую цветокоррекцию, применять анимацию и производить финальный экспорт проекта.
        </Text>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Дата выдачи: {date}{"\n"}
            Платформа ClipLab | www.clip-lab.ru
          </Text>
          <Image src={cliplabLogo} style={styles.footerLogo} />
        </View>
      </Page>
    </Document>
  );
}