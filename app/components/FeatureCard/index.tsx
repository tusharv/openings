import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import Image from "next/image";

const FeatureCard = ({ iconSvg, name, desc }: any) => {
  const [favicon, setFavicon] = useState(
    `/logo-cache/${new URL(desc).hostname}.png`
  );
  return (
    <Box
      flexDirection="column"
      borderWidth={1}
      borderColor="$borderDark700"
      m="$2"
      p="$4"
      rounded="$md"
      sx={{
        "@base": {
          minWidth: "300px",
        },
      }}
    >
      <Box alignItems="center" display="flex" flexDirection="row">
        <Image
          src={favicon}
          alt="document"
          width={22}
          height={22}
          priority
          onError={() => setFavicon("/rocket.svg")}
        />
        <a href={desc} target="_blank">
          <Text fontSize={22} color="$white" fontWeight="500" ml="$2">
            {name}
          </Text>
        </a>
      </Box>
    </Box>
  );
};

export default FeatureCard;
