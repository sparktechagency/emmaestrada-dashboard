import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SharedInput from "../../shared/SharedInput";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit: (values: any) => void;
  editData?: any;
}

const SliderModal: React.FC<Props> = ({
  open,
  setOpen,
  onSubmit,
  editData,
}) => {
  const [values, setValues] = useState({
    name: "",   
    link: "",
  });

  useEffect(() => {
    if (editData) {
      setValues({
        name: editData.name || "",      
        link: editData.link || "",
      });
    }
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
    setValues({ name: "", link: "" });
  };

  const handleSubmit = () => {
    if (!values.name) return;
    onSubmit(values);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "#121212",
          color: "white",
          borderRadius: 3,
          border: "1px solid rgba(207,151,2,0.6)",
        },
      }}
    >
      <DialogTitle fontWeight={600}>
        {editData ? "Edit Slider" : "Add Slider"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={12}>
            <SharedInput
              label="Slider Name"
              value={values.name}
              onChange={(e: any) =>
                setValues({ ...values, name: e.target.value })
              }
            />
          </Grid>          

          <Grid size={12}>
            <SharedInput
              label="Link"
              value={values.link}
              onChange={(e: any) =>
                setValues({ ...values, link: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SliderModal;