import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Box } from "@mui/material";

type Props = {};

const SmsLunarGif = (props: Props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        // take these as props
        width: "25rem",
        height: "25rem",
      }}
    >
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Image src="/sms_logo_for_animation.png" fill alt="sms logo" />
      </Box>
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            left: 0,
            top: "calc(50% - 2.5rem)",
            width: "20%",
            height: "20%",
          }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/game_control_full.png" fill alt="coins illustration" />
        </Box>
      </Box>
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            right: "6.25rem",
            top: "calc(0.16 * 12.5rem)",
            width: "20%",
            height: "20%",
          }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/tokens_full.png" fill alt="coins illustration" />
        </Box>
      </Box>
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            right: "6.25rem",
            bottom: "calc(0.16 * 12.5rem)",
            width: "20%",
            height: "20%",
          }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/nft_full.png" fill alt="coins illustration" />
        </Box>
      </Box>
    </Box>
  );
};

export default SmsLunarGif;
