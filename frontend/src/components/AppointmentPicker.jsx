import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse, isSameDay } from "date-fns";
import getAvailableDates from "../utils/getAvailableDates";
import { useAppContext } from "../context/AppContext";

const AppointmentPicker = ({ docInfo }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    useAppContext();
  const [availableTimes, setAvailableTimes] = useState([]);

  // Generate available dates
  useEffect(() => {
    if (docInfo?.availability?.days) {
      const dates = getAvailableDates(docInfo.availability.days);
      setAvailableDates(dates.map((d) => new Date(d.value))); // to Date objects
    }
  }, [docInfo]);

  // Generate available times based on selected date and docInfo.availability.timeSlots
  useEffect(() => {
    if (!selectedDate || !docInfo?.availability?.timeSlots) return;

    const timeSlots = docInfo.availability.timeSlots;
    const slots = [];

    const isToday =
      selectedDate &&
      format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

    timeSlots.forEach((slot) => {
      const [start, end] = slot.split(" - ");

      const startHour = parse(start, "h:mm a", new Date());
      const endHour = parse(end, "h:mm a", new Date());

      let current = startHour;
      while (current < endHour) {
        if (!isToday || current > new Date()) {
          slots.push(format(current, "h:mm a"));
        }
        current = new Date(current.getTime() + 30 * 60000);
      }
    });

    setAvailableTimes(slots);

    // ✅ Only reset if it's not already reset
    if (selectedTime !== "") {
      setSelectedTime("");
    }
  }, [selectedDate, docInfo]);

  // Disable dates not in availability
  const shouldDisableDate = (date) => {
    return !availableDates.some((availableDate) =>
      isSameDay(date, availableDate)
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <DatePicker
          label="Select Appointment Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          shouldDisableDate={shouldDisableDate}
          slotProps={{ textField: { variant: "outlined" } }}
        />

        {selectedDate && (
          <FormControl fullWidth>
            <InputLabel>Select Time</InputLabel>
            <Select
              value={selectedTime}
              label="Select Time"
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {availableTimes.map((time, idx) => (
                <MenuItem key={idx} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedDate && selectedTime && (
          <Typography variant="body1" className="text-primary">
            You selected: {format(selectedDate, "do MMMM (EEEE)")},{" "}
            {selectedTime}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentPicker;
