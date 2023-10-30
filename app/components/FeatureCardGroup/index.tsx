// Disable typecheck
// @ts-nocheck

import {
  Box,
  Badge,
  BadgeText,
  Button,
  ButtonText,
  VStack,
} from "@gluestack-ui/themed";
import FeatureCard from "../FeatureCard";

const FeatureCardGroup = ({
  char,
  items,
}: {
  char: string;
  items: { name: string; url: string }[];
}) => {
  return (
    <Box
      sx={{
        "@base": {
          flexDirection: "column",
          flexWrap: "wrap",
        },
        "@md": {
          flexDirection: "column",
        },
      }}
      id={char}
    >
      <Box
        position="sticky"
        top={40}
        mt={40}
        mb={10}
        zIndex={10}
        p="$4"
        sx={{
          "@base": {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center", // Add this line
          },
        }}
      >
        <VStack>
          <Badge
            h={22}
            bg="$red600"
            borderRadius="$full"
            mb={-14}
            mr={-14}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
          >
            <BadgeText color="$white">{items.length}</BadgeText>
          </Badge>
          <Button bg="$success700" borderColor="$success700">
            <ButtonText>{char}</ButtonText>
          </Button>
        </VStack>
      </Box>
      <Box
        zIndex={5}
        sx={{
          "@base": {
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            minWidth: "350px",
          },
        }}
      >
        {items.map((item: { name: string; url: string }, index: number) => (
          <FeatureCard
            key={index}
            iconSvg="rocket.svg"
            name={item?.name}
            desc={item?.url}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeatureCardGroup;
