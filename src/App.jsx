import ActionAreaCard from "./card";
import { useEffect, useMemo, useState } from "react";
import BasicTextFields from "./search";
import { Box, CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { fetchPlaylist, fetchToken } from "./query";


function App() {
  const [option, setOption] = useState({ token: "", genre: [], list: {} });

  const [typeValue, setTypeValue] = useState("Album");
  const [genreValue, setGenreValue] = useState(null);
  const [type, setType] = useState("Album");
  const [genre, setGenre] = useState("");
  const types = ["Album", "Artist"];
  const [query, setQuery] = useState("As it was");

  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        }),
      [prefersDarkMode],
    );

  useEffect(() => {
    fetchToken(setOption);
  }, []);

  useEffect(() => {
    fetchPlaylist(option.token, query, typeValue, setOption);
  }, [option.token, typeValue]);

  console.log(option.list);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box mt={"20px"}>
          <Box
            display={"flex"}
            gap={"10px"}
            justifyContent={"center"}
            mb={"20px"}
          >
            <Autocomplete
              onInputChange={(event, newValue) => {
                setType(newValue);
              }}
              onChange={(event, newValue) => {
                setTypeValue(newValue);
              }}
              inputValue={type}
              value={typeValue}
              id="controllable-states-demo"
              options={types}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
            <Autocomplete
              onInputChange={(event, newValue) => {
                setGenre(newValue);
              }}
              onChange={(event, newValue) => {
                setGenreValue(newValue);
              }}
              inputValue={genre}
              value={genreValue}
              id="controllable-states-demo"
              options={option.genre}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Genre" />}
            />
            <BasicTextFields query={query} setQuery={setQuery} />
            <Button
              variant="contained"
              onClick={() => {
                fetchPlaylist(option.token, query, typeValue, setOption);
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
          <Box
            display={"flex"}
            gap={"10px"}
            justifyContent={"center"}
            mb={"20px"}
            rowGap={"15px"}
            flexWrap={"wrap"}
          >
            {typeValue === "Album"
              ? option.list?.albums?.items.map((item) => {
                  return (
                    <ActionAreaCard
                      name={item.name}
                      img={item.images[1].url}
                      artistsName={item.artists[0].name}
                      key={item.id}
                    />
                  );
                })
              : option.list?.artists?.items.map((item) => {
                  return (
                    <ActionAreaCard
                      name={item.name}
                      img={item.images[1]?.url}
                      artistsName={item.genres}
                      key={item.id}
                    />
                  );
                })}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
