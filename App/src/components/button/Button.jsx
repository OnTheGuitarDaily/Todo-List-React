import Button from "@mui/material/Button";

export default function ButtonComponent({ type, onClick, child, icon, color }) {
  return (
    <Button
    type = {type}
      onClick={onClick}
      style={{ border: "1px solid", color: color }}
      startIcon={icon}
      variant="outlined"
    >
      {child}
    </Button>
  );
}
