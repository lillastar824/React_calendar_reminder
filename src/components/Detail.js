import React from "react";
import { IconButton, Box, Typography, Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useDispatch } from "react-redux";
import slice from "src/slices/calendar";

const Detail = ({ date, event, index, onEdit }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(slice.actions.deleteEvent({ id: date.toUTCString(), index }));
  };

  return (
    <Box>
      <Box bgcolor="#0ff">
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Divider />
        <Typography variant="h4" style={{ padding: "3px 10px 3px 15px" }}>
          {event.title}
        </Typography>
      </Box>
      <Box display="flex" px={3} pt={2} pb={3} bgcolor="#fff">
        <ScheduleIcon />
        <Typography style={{ marginLeft: 8 }}>
          {date.toUTCString().substr(0, 16) +
            " (" +
            event.from +
            "-" +
            event.to +
            ")"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Detail;
