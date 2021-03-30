import React, { useMemo } from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import slice from "src/slices/calendar";

const More = ({ date }) => {
  const calendar = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const events = useMemo(() => {
    return calendar[date?.toUTCString()] ?? [];
  }, [calendar, date]);

  const onEdit = () => {};

  const onDelete = (index) => {
    dispatch(slice.actions.deleteEvent({ id: date.toUTCString(), index }));
  };

  return (
    <Box
      style={{
        backgroundColor: "grey",
        padding: "10px",
      }}
    >
      <Typography variant="h6" style={{ marginBottom: 10 }}>
        {date.toUTCString()?.substr(0, 16)}
      </Typography>
      {events.map((event, index) => (
        <Box display="flex" key={index} alignItems="center">
          <Box height="40px" width="5%" bgcolor={event.color} />
          <Box ml={2} mr={5}>
            <Typography color={event.color}>{event.from}</Typography>
            <Typography>{event.to}</Typography>
          </Box>
          <Typography
            style={{
              minWidth: "50px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginRight: 10,
            }}
          >
            {event.title}
          </Typography>
          <IconButton onClick={() => onEdit(index)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default More;
