import { DateRangePicker } from "@mui/x-date-pickers-pro";

export default function DateRange() {

  return (
    <DateRangePicker
      startText="From"
      endText="To"
      value={dateRange}
      onChange={handleDateRangeChange}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} />
          <Box sx={{ mx: 2 }}> to </Box>
          <TextField {...endProps} />
        </>
      )}
    />
  );
}
