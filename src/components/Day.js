import React, { useState, useMemo } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { getDate, getMonth } from "date-fns";
import Add from "./AddNew";
import Detail from "./Detail";
import More from "./More";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popup from "reactjs-popup";

const Day = ({ date, symbol }) => {
  const [add, setAdd] = useState(null);
  const [edit, setEdit] = useState(null);
  const calendar = useSelector((state) => state.calendar);

  const events = useMemo(() => {
    return calendar[date.toUTCString()] ?? [];
  }, [date, calendar]);

  const onAdd = () => {
    setEdit(null);
    setAdd(date);
  };

  const onEdit = (event, index) => {
    setAdd(date);
    setEdit({ event, index });
  };

  return (
    <>
      <Box
        flex={1}
        height="110px"
        border="1px solid grey"
        pl={0.3}
        pt={0.2}
        onClick={onAdd}
        bgcolor="#ffff0f23"
      >
        <Typography>
          {date &&
            (getDate(date) === 1 || symbol ? getMonth(date) + 1 + "/" : "") +
              getDate(date)}
        </Typography>
        <Box>
          {events.slice(0, 3).map((event, index) => (
            <Popup
              trigger={
                <Typography
                  key={index}
                  variant="body2"
                  style={{
                    maxWidth: "80px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    backgroundColor: event.color,
                    borderRadius: 10,
                    padding: "0px 10px",
                    marginTop: "5px",
                  }}
                >
                  {event.title}
                </Typography>
              }
              on={["hover", "focus"]}
              position={["left center", "right center"]}
              closeOnDocumentClick
            >
              <Detail
                date={date}
                event={event}
                index={index}
                onEdit={() => onEdit(event, index)}
              />
            </Popup>
          ))}
          {events.length > 3 && (
            <Popup
              trigger={
                <IconButton style={{ float: "right", top: -30 }}>
                  <MoreHorizIcon />
                </IconButton>
              }
              on={["hover", "focus"]}
              position={["right center", "left center"]}
              closeOnDocumentClick
            >
              <More date={date} />
            </Popup>
          )}
        </Box>
      </Box>
      <Add date={add} onClose={() => setAdd(null)} value={edit} />
    </>
  );
};

export default Day;
