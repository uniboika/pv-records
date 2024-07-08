import { Card, CardContent, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { separator } from "../Helper";

export default function SummaryCard({ title, balance, comparison, currentDate }) {
  const isPositive = comparison >= 0;

  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ my: 1 }}>
          {separator(balance)}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          color={isPositive ? "red" : "green"}
        >
          {isPositive ? <ArrowUpward /> : <ArrowDownward />}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {Math.abs(comparison).toFixed(2)}%{" "}
            {isPositive ? "increase" : "decrease"} from last period
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          As of {currentDate}
        </Typography>
      </CardContent>
    </Card>
  );
};
