import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  makeStyles,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { CirclePicker } from "react-color";
import * as Yup from "yup";
import { isAfter } from "date-fns";
import { useDispatch } from "react-redux";
import slice from "src/slices/calendar";

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "50%",
      minHeight: "300px",
    },
  },
  dialogTitle: {
    "& .MuiTypography-root": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
});

const schema = Yup.object().shape({
  to: Yup.string().required("Required"),
  from: Yup.string().required("Required"),
  title: Yup.string()
    .required("Required")
    .max(30, "Should be less 30 characters"),
  color: Yup.string(),
});

const initialForm = {
  title: "",
  from: "06:00",
  to: "18:00",
  color: "#f0f",
};

const AddNew = ({ date, onClose, value }) => {
  const [openColor, setOpenColor] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(value ? value.event : initialForm);
  }, [value]);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onSave = () => {
    schema
      .validate(form)
      .then(() => {
        if (
          isAfter(
            new Date(
              2019,
              9,
              2,
              form.from.substring(0, 2),
              form.from.substring(3, 5),
              0,
              0
            ),
            new Date(
              2019,
              9,
              2,
              form.to.substring(0, 2),
              form.to.substring(3, 5),
              0,
              0
            )
          )
        )
          setErrors({
            to: "Enter the correct timeslot.",
          });
        else {
          setErrors({});
          setForm(initialForm);
          onClose();
          if (!value)
            dispatch(
              slice.actions.addEvent({
                id: date.toUTCString(),
                event: form,
              })
            );
          else
            dispatch(
              slice.actions.editEvent({
                id: date.toUTCString(),
                index: value.index,
                event: form,
              })
            );
        }
      })
      .catch((err) => {
        setErrors({
          [err.path]: err.message,
        });
      });
  };

  const classes = useStyles();

  const close = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <Dialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={date ? true : false}
      className={classes.modal}
    >
      <DialogTitle onClose={close} className={classes.dialogTitle}>
        <Typography variant="h5">
          {value ? "Edit A Event" : "Add New Event"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={close}
          style={{
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" mt={1}>
          <Box
            bgcolor={form.color}
            width="30px"
            height="30px"
            borderRadius="30px"
            mr={3}
            onClick={() => setOpenColor(true)}
          ></Box>
          <Box
            position="absolute"
            mt={5}
            zIndex={10}
            display={openColor ? "flex" : "none"}
          >
            <CirclePicker
              onChange={(color) => {
                setForm((form) => ({ ...form, color: color.hex }));
                setOpenColor(false);
              }}
            />
          </Box>
          <TextField
            placeholder="Add Title"
            style={{ width: "450px" }}
            onChange={(e) =>
              setForm((form) => ({ ...form, title: e.target.value }))
            }
            value={form.title}
            error={errors.title}
            helperText={errors.title}
          />
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <Typography style={{ marginRight: 10 }}>Schedule: </Typography>
          <TextField
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: false,
            }}
            inputProps={{
              step: 300,
            }}
            value={form.from}
            onChange={(e) =>
              setForm((form) => ({ ...form, from: e.target.value }))
            }
            error={errors.from}
            helperText={errors.from}
          />
          <Typography style={{ marginRight: 15, marginLeft: 15 }}>
            to
          </Typography>
          <TextField
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: false,
            }}
            inputProps={{
              step: 300,
            }}
            onChange={(e) =>
              setForm((form) => ({ ...form, to: e.target.value }))
            }
            value={form.to}
            error={errors.to}
            helperText={errors.to}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onSave} color="primary">
          Save
        </Button>
        <Button onClick={close} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNew;
