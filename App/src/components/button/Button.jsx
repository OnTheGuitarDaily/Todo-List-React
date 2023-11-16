import Button from "@mui/material/Button";

export default function ButtonComponent({ type, onClick, child, border = '1px solid white', color }) {
  return (
    <Button
      type ={type}
      onClick={onClick}
      style={{border: border,color: color }}
      variant="outlined"
    >
      {child}
    </Button>
  );
}
