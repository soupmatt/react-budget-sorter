import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BudgetSorter } from "./BudgetSorter";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="l">
      <Grid minH="100vh" p={3}>
        <Box maxW="5xl" borderWidth="1px" borderRadius="lg">
          <ColorModeSwitcher justifySelf="flex-end" />
          <BudgetSorter />
        </Box>
      </Grid>
    </Box>
  </ChakraProvider>
);
