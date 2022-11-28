import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { flexCenter, modalStyle } from "../../styles/globalStyle";

import { TextField, Typography } from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";

export default function NewFirmModal({ open, setOpen, info, setInfo }) {
  // post islemi icin post hook unu useStockCalls'dan cagiriyoruz.
  const { postFirm } = useStockCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    postFirm(info);
    setOpen(false);
    // state'leri sıfırlamak icin
    setInfo({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //? state bir obje old. icin spread ile acip ilgili yeri degistiriyoruz
    setInfo({ ...info, [name]: value });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {/* component propertisine form denildiği zaman Box elementi form elementi gibi davranır */}
          <Box component="form" onSubmit={handleSubmit} sx={flexCenter}>
            <Typography variant="h5" color="error" mb={1}>
              Add Firms
            </Typography>

            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              value={info?.name || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              variant="outlined"
              value={info?.phone || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="image"
              name="image"
              type="url"
              label="İmage URL"
              variant="outlined"
              value={info?.image || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              value={info?.address || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained">
              Add Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
