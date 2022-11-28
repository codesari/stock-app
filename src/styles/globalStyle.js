//! best practice
//* her tarafta kullanabilmek icin export yapiyorum
export const btnHoverStyle = (color) => {
  const style = {
    cursor: "pointer",
    "&:hover": { color: `${color}` },
  };
  return style;
};

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const flexCenter = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 3,
};
