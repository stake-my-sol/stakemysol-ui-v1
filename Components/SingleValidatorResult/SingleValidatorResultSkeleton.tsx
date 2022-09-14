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
        <Box sx={{ width: "100%" }}>
          <Skeleton height={30} width="100%" />
          <Divider />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton height={20} width={60} />
              <Skeleton height={20} width={60} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton height={20} width={60} />
              <Skeleton height={20} width={60} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Skeleton height={50}>
          <Button />
        </Skeleton>
        <Skeleton height={50}>
          <Button />
        </Skeleton>
      </Box>
    </>
  );
}

export default SingleValidatorResultSkeleton;
