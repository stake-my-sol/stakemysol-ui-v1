import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import _ from "lodash";
import { Box, Container, Divider, Modal, Paper } from "@mui/material";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import stakeMySolAxios from "../axios-instances";
import PaginationCmp from "../Components/ValidatorsResultPagination";
import FilterBar from "../Components/FilterBar";
import ValidatorsResult from "../Components/ValidatorsResult";
import SelectedValidatorModal from "../Components/SelectedValidatorModal";
import { NetworkContext } from "../Contexts/NetworkProvider";

import useToggle from "../hooks/useToggle";
import { IValidator } from "../@types";
import { GeneralNetworkDataContext } from "../Contexts/GeneralNetworkDataProvider";
import useSWR from "swr";

function ValidatorsPage() {
  const { network } = useContext(NetworkContext)!;
  const { count } = useContext(GeneralNetworkDataContext)!;
  const [validators, setValidators] = useState<IValidator[]>([]);
  const [sortBy, setSortBy] = useState<string>("total_score");
  const [sortDir, setSortDir] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [selectedValidator, setSelectedValidator] = useState<IValidator | null>(
    null,
  );
  const [openModal, toggleOpenModal] = useToggle(false);

  const handleOpenShowMore = (validator: IValidator) => {
    toggleOpenModal();
    setSelectedValidator(validator);
  };

  const handleCloseShowMore = () => {
    toggleOpenModal();
    setSelectedValidator(null);
  };

  const validatorsFetcher = async (...args: any[]) => {
    try {
      const reqNetwork =
        args[0] === WalletAdapterNetwork.Mainnet ? "mainnet" : network;

      const reqBody = {
        network: reqNetwork,
        page: args[1],
        perPage: args[2],
        sort: {
          sortBy: args[3],
          direction: args[4],
        },
      };
      const { data } = await stakeMySolAxios.post("/data/validators", {
        data: reqBody,
      });

      return data;
    } catch (error: any) {
      if (error.name === "AbortError") {
        // handle error thrown by aborting request
      }

      console.log(`Failed at validatorsFetcher. Error ${error}`);
      throw error;
    }
  };

  const { data, error } = useSWR(
    [network, page, perPage, sortBy, sortDir],
    validatorsFetcher,
  );

  useEffect(() => {
    setValidators(data);
  }, [data]);

  let modal = null;
  if (!_.isEmpty(selectedValidator)) {
    // do sth
    modal = (
      <Modal open={openModal} onClose={handleCloseShowMore}>
        <SelectedValidatorModal validator={selectedValidator!} />
      </Modal>
    );
  }

  // *: calculating number of pages
  // *: |validators| / perPage = number of pages
  const pagesNum = Math.ceil(count! / perPage);
  return (
    <>
      <Head>
        <title>Validators Page</title>
      </Head>

      <Paper
        sx={{
          mt: 4,
          minWidth: "15rem",
          width: "75%",
          maxWidth: "45rem",
          mx: "auto",
        }}
      >
        <Container>
          {modal || null}
          <Box>
            <FilterBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDir={sortDir}
              setSortDir={setSortDir}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          </Box>
          <Divider sx={{ mt: "1rem", mb: "1rem" }} />
          <ValidatorsResult
            handleOpenShowMore={handleOpenShowMore}
            validators={validators}
            perPage={perPage}
          />
          <Divider sx={{ mt: "1rem" }} />
          <Box>
            <PaginationCmp pagesNum={pagesNum} page={page} setPage={setPage} />
          </Box>
        </Container>
      </Paper>
    </>
  );
}

export default ValidatorsPage;
