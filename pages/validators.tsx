import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import _ from "lodash";
import { Box, Container, Divider, Modal } from "@mui/material";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import stakeMySolAxios from "../src/axios-instances";
import PaginationCmp from "../src/Components/ValidatorsResultPagination";
import RankingBar from "../src/Components/RankingBar";
import ValidatorsResult from "../src/Components/ValidatorsResult";
import SelectedValidatorModal from "../src/Components/SelectedValidatorModal";
import { NetworkContext } from "../src/Contexts/NetworkProvider";

import useToggle from "../src/hooks/useToggle";
import { Validator } from "../src/@types/types";
import { GeneralNetworkDataContext } from "../src/Contexts/GeneralNetworkDataProvider";

function ValidatorsPage() {
  const { network } = useContext(NetworkContext)!;
  const { count } = useContext(GeneralNetworkDataContext)!;
  const [validators, setValidators] = useState<Validator[]>([]);
  const [sortBy, setSortBy] = useState<string>("total_score");
  const [sortDir, setSortDir] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(
    null,
  );
  const [openModal, toggleOpenModal] = useToggle(false);

  const handleOpenShowMore = (validator: Validator) => {
    toggleOpenModal();
    setSelectedValidator(validator);
  };

  const handleCloseShowMore = () => {
    toggleOpenModal();
    setSelectedValidator(null);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const getValidators = async () => {
      try {
        const reqNetwork =
          network === WalletAdapterNetwork.Mainnet ? "mainnet" : network;

        const reqBody = {
          network: reqNetwork,
          page,
          perPage,
          sort: {
            sortBy,
            direction: sortDir,
          },
        };
        const { data } = await stakeMySolAxios.post("/data/validators", {
          signal: abortController.signal,
          data: reqBody,
        });

        setValidators(data);
      } catch (error: any) {
        if (error.name === "AbortError") {
          // handle error thrown by aborting request
        }
      }
    };

    getValidators();

    return () => {
      abortController.abort();
    };
  }, [network, page, perPage, sortBy, sortDir]);

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

      <Container maxWidth="sm">
        {modal || null}
        <Box>
          <RankingBar
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
        <Box sx={{ mt: "1rem", mb: "1rem" }}>
          <PaginationCmp pagesNum={pagesNum} page={page} setPage={setPage} />
        </Box>
      </Container>
    </>
  );
}

export default ValidatorsPage;
