import { useState } from "react";
import "./App.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { koKR } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { Button, Typography } from "@mui/material";

dayjs.locale("ko");

function App() {
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<string>("");

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = birthDate.toDate();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge(`${years}년 ${months}개월 ${days}일`);
  };

  return (
    <div className="app">
      <h1>생활연령 계산기</h1>
      <p>태어난 연도를 선택해주세요</p>

      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          koKR.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <DatePicker
          sx={{
            color: "white",
            borderColor: "white",
            backgroundColor: "white",
            width: "100%",
            margin: "10rem 0",
          }}
          label="생년월일 선택"
          value={birthDate}
          onChange={(newValue) => setBirthDate(newValue)}
        />
      </LocalizationProvider>

      <Button
        variant="contained"
        color="primary"
        onClick={calculateAge}
        style={{ padding: "10px 20px", width: "100%" }}
      >
        계산하기
      </Button>

      {age && (
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          생활연령: {age}
        </Typography>
      )}
    </div>
  );
}

export default App;
