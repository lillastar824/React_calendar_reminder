import React, { useEffect, useState } from "react";
import { isSameDay, addDays, getDay, subDays } from "date-fns";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  IconButton,
} from "@material-ui/core";
import Day from "./Day";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octobor",
  "November",
  "December",
];

const Calendar = () => {
  const [month, setMonth] = useState(3);
  const [year, setYear] = useState(2021);
  const [days, setDays] = useState([[]]);

  useEffect(() => {
    let days = [[]];
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);

    let w = 0;
    for (let i = 0; i < getDay(start); i++) {
      days[w].push(subDays(start, i + 1));
    }

    days[w].reverse();

    for (let d = start; !isSameDay(d, end); d = addDays(d, 1)) {
      if (getDay(d) === 0) {
        w++;
        days[w] = [];
      }
      days[w].push(d);
    }

    for (let i = getDay(end) - 1; i > -1 && i < 6; i++) {
      days[w].push(addDays(end, i - getDay(end) + 1));
    }

    setDays(days);
  }, [month, year]);

  const changeMonth = (e) => {
    setMonth(Number(e.target.value));
  };

  const changeYear = (e) => {
    setYear(Number(e.target.value));
  };

  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={3}>
        <Typography variant="h3">Calendar</Typography>
      </Box>

      <Box display="flex" alignItems="center" mb={3}>
        <IconButton
          onClick={() => setMonth((month) => (month > 0 ? --month : month))}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={() => setMonth((month) => (month < 11 ? ++month : month))}
        >
          <NavigateNext />
        </IconButton>
        <Box mr={2} />
        <Select value={month} onChange={changeMonth} style={{ width: "105px" }}>
          {months.map((m, index) => (
            <MenuItem value={index} key={index}>
              {m}
            </MenuItem>
          ))}
        </Select>
        <TextField
          style={{ paddingLeft: 5, width: "35px" }}
          value={year}
          onChange={changeYear}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        border="1px solid grey"
        bgcolor="#ffff0f48"
        borderBottom={0}
      >
        {weekdays.map((weekday, index) => (
          <Box
            key={index}
            border="1px solid grey"
            borderRight={1}
            borderBottom={0}
            height="35px"
            display="flex"
            flex={1}
            alignItems="center"
            pl={0.2}
          >
            <Typography variant="body1">{weekday}</Typography>
          </Box>
        ))}
      </Box>

      {/* Display days for the current month */}
      {days.map((week, index) => {
        return (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            border="1px solid grey"
            borderBottom={index === days.length - 1 ? 1 : 0}
            borderTop={index === 0 ? 1 : 0}
          >
            {week.map((day, i) => (
              <Day key={i} date={day} symbol={index === 0 && i === 0} />
            ))}
          </Box>
        );
      })}
    </Container>
  );
};

export default Calendar;
