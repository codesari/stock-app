//! best practice
//* her tarafta kullanabilmek icin export yapiyorum
export const btnHoverStyle = (color) => {
  const style = {
    cursor: "pointer",
    "&:hover": { color: `${color}` },
  };
  return style;
};
