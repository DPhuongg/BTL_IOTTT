import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    {/* <QueryClientProvider client={queryClient}> */}
      <App />
    {/* </QueryClientProvider> */}
  </BrowserRouter>,
  document.getElementById("root"),
);
