// Disable typecheck
// @ts-nocheck

import { Box, Text } from '@gluestack-ui/themed';
import FeatureCard from '../FeatureCard';

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
        '@base': {
          flexDirection: 'column',
          flexWrap: 'wrap',
        },
        '@md': {
          flexDirection: 'column',
        },
      }}
      id={char}
    >
      <Box
        position='sticky'
        top={40}
        mt={40}
        mb={10}
        p='$4'
        sx={{
          '@base': {
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center', // Add this line
          },
          '@md': {
            flexDirection: 'row',
          },
        }}
      >
        <Text fontSize={22} bg='$black' color='$white' fontWeight='500' ml='$2'>
          {char}
        </Text>
      </Box>
      <Box zIndex={5}>
        {items.map((item: { name: string; url: string }, index: number) => (
          <FeatureCard
            key={index}
            iconSvg='rocket.svg'
            name={item?.name}
            desc={item?.url}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeatureCardGroup;
