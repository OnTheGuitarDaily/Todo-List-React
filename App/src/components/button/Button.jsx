import Button from "@mui/material/Button";

export default function ButtonComponent({ onClick, child, icon, color }) {
  return (
    <Button
      onClick={onClick}
      style={{ border: "1px solid", color: color }}
      startIcon={icon}
      variant="outlined"
    >
      {child}
    </Button>
  );
}
