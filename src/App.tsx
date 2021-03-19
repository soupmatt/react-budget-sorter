import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BudgetSorter } from "./BudgetSorter";
import data from "./data.json";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="l">
      <Grid minH="100vh" p={3}>
        <Box maxW="lg" borderWidth="1px" borderRadius="lg">
          <ColorModeSwitcher justifySelf="flex-end" />
          <BudgetSorter records={Array.from(data)} />
        </Box>
      </Grid>
    </Box>
  </ChakraProvider>
);
