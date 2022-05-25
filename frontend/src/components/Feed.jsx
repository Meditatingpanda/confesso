import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
const Feed = () => {
  const state = useSelector((state) => state.timeLine);
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {state.isLoading ? (
        <>
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        </>
      ) : (
        state.posts.map((post) => {
          return <Post key={post._id} {...post} />;
        })
      )}
    </Box>
  );
};

export default Feed;
