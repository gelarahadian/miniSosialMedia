import { useRouteError } from "react-router-dom";
import { Box } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Box sx={{margin: '3rem auto', textAlign: "center"}}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Box>
  );
}