import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import AppIndex from "./routes/AppIndex";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <AppIndex />
        <Toaster />
      </div>
    </LocalizationProvider>
  );
}

export default App;
