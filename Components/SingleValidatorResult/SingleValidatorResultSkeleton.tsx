import { Skeleton, Button, Box, Avatar, Divider } from "@mui/material";

function SingleValidatorResultSkeleton() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 1,
          }}
        >
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "space-between",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton sx={{ flexGrow: 1, mx: 3 }} height={40} width={60} />
            <Skeleton sx={{ flexGrow: 1, mx: 3 }} height={40} width={60} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton sx={{ flexGrow: 1, mx: 3 }} height={40} width={60} />
            <Skeleton sx={{ flexGrow: 1, mx: 3 }} height={40} width={60} />
          </Box>
          <Skeleton sx={{ margin: "auto" }} height={40} width={100} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            borderLeft: "1px solid black",
            ml: 1,
            pl: 1,
          }}
        >
          <Skeleton height={50}>
            <Button />
          </Skeleton>
          <Skeleton height={50}>
            <Button />
          </Skeleton>
        </Box>
      </Box>
    </>
  );
}

export default SingleValidatorResultSkeleton;
