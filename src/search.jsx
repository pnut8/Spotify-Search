import { TextField } from "@mui/material";


export default function BasicTextFields({ setQuery, query }) {
  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      value={query}
      variant="outlined"
      onChange={handleSearch}
    />
  );
}
