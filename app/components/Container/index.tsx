import {
  Box,
  Text,
  Input,
  InputField,
  InputIcon,
  SearchIcon,
  InputSlot,
} from '@gluestack-ui/themed';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import FeatureCardGroup from '../FeatureCardGroup';

interface ICompany {
  name: string;
  url: string;
}

const Container = () => {
  const [data, setData] = useState([] as ICompany[]);
  const [rawData, setRawData] = useState([] as ICompany[]);
  const [searchTerm, setSearchTerm] = useState('' as string);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
        setRawData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setData(
        rawData.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        )
      );
    } else {
      setData(rawData);
    }
  }, [searchTerm]);

  const groupedData = data.reduce(
    (acc: { [key: string]: ICompany[] }, item) => {
      const firstChar = item.name.charAt(0).toUpperCase();
      if (!acc[firstChar]) {
        acc[firstChar] = [];
      }
      acc[firstChar].push(item);
      return acc;
    },
    {}
  );

  return (
    <Box
      bg='$black'
      h='100vh'
      w='100vw'
      overflow='scroll'
      scrollBehavior='smooth'
    >
      <Box
        position='fixed'
        sx={{
          '@base': {
            h: 500,
            w: 500,
          },
          '@lg': {
            h: 700,
            w: 700,
          },
        }}
      >
        <Image src='/gradient.svg' alt='Gradient' fill priority />
      </Box>
      <Box>
        <Text color='$white' fontWeight='$bold' m='$2' p='$4' size='6xl'>
          More than Big Tech
        </Text>
      </Box>
      <Box m='$4' p='$4'>
        <Input
          variant='outline'
          size='md'
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            color='$black'
            bg='$white'
            placeholder='Enter Text here'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputSlot p='$3'>
            <InputIcon as={SearchIcon} color='$white'></InputIcon>
          </InputSlot>
        </Input>
      </Box>
      <Box justifyContent='center' alignItems='center' m='$2'>
        {data.length > 0 && (
          <Text color='$white' fontWeight='$normal' ml='$2' pl='$4' size='xl'>
            Career Page from {data.length} Compnies
          </Text>
        )}
      </Box>
      <Box>
        <Box
          justifyContent='center'
          alignItems='center'
          position='sticky'
          top={0}
          w='100%'
          zIndex={10}
        >
          <Box
            justifyContent='center'
            flexDirection='row'
            flexWrap='wrap'
            bg='$black'
          >
            {Object.entries(groupedData).map(([char, items]) => (
              <Box m='$1' p='$1'>
                <a href={`#${char}`}>
                  <Text color='$white' fontWeight='$bold' ml='$2' size='xl'>
                    {char}
                  </Text>
                </a>
              </Box>
            ))}
          </Box>
        </Box>
        <Box zIndex={9}>
          {Object.entries(groupedData).map(([char, items]) => (
            <FeatureCardGroup key={char} char={char} items={items} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
