// Disable typecheck
// @ts-nocheck

import {
  Box,
  Text,
  Input,
  InputField,
  InputIcon,
  SearchIcon,
  InputSlot,
  Spinner,
} from '@gluestack-ui/themed';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import FeatureCardGroup from '../FeatureCardGroup';

interface ICompany {
  name: string;
  url: string;
}

enum PAGE_STATE {
  LOADING = 'Loading',
  ERROR = 'Error',
  SUCCESS = 'Success',
}

const Container = () => {
  const [data, setData] = useState([] as ICompany[]);
  const [rawData, setRawData] = useState([] as ICompany[]);
  const [searchTerm, setSearchTerm] = useState('' as string);
  const [pageState, setPageState] = useState(PAGE_STATE.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        // Sorting data
        const sortedData = jsonData.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); //
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        setData(sortedData);
        setRawData(sortedData);
        setPageState(PAGE_STATE.SUCCESS);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPageState(PAGE_STATE.ERROR);
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

  if (pageState === PAGE_STATE.LOADING) {
    return (
      <Box
        justifyContent='center'
        alignItems='center'
        bg='$black'
        w='100vw'
        h='100vh'
      >
        <Spinner size='large' color='$white' />
      </Box>
    );
  }

  if (pageState === PAGE_STATE.ERROR) {
    return (
      <Box
        justifyContent='center'
        alignItems='center'
        bg='$black'
        w='100vw'
        h='100vh'
      >
        <Text color='$white' fontWeight='$bold' size='xl'>
          Error fetching data
        </Text>
      </Box>
    );
  }

  return (
    <Box bg='$black' h='100vh' w='100vw' overflow='scroll'>
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
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='nowrap'
        m='$2'
      >
        <Image width={56} height={56} src='/career.svg' alt='Career' priority />
        <Text color='$white' fontWeight='$bold' m='$2' p='$4' size='6xl'>
          Career Pages
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
          <InputSlot p='$3'>
            <InputIcon as={SearchIcon} color='$white'></InputIcon>
          </InputSlot>
        </Input>
      </Box>
      <Box justifyContent='center' alignItems='center' m='$2'>
        {data.length > 0 && (
          <Text color='$white' fontWeight='$normal' ml='$2' pl='$4' size='xl'>
            Career Page from {data.length} Companies
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
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          m='$2'
          sx={{
            '@base': {
              flexDirection: 'column',
              flexWrap: 'wrap',
            },
            '@md': {
              flexDirection: 'row',
            },
          }}
        >
          <Box flexDirection='row' px='$4'>
            <a
              href='https://icon-icons.com/icon/man-people-businessman-worker-employee-career/210714'
              target='_blank'
            >
              <Text pl='$2' color='$white'>
                Free Icon
              </Text>
            </a>
          </Box>
          <Box flexDirection='row' px='$4' alignItems='center'>
            <a href='https://gluestack.io/' target='_blank'>
              <Image
                width={139}
                height={23}
                src='/logo.svg'
                alt='Gluestack'
                priority
              />
            </a>
          </Box>
          <Box flexDirection='row' px='$4'>
            <a
              href='https://github.com/Kaustubh-Natuskar/moreThanFAANGM'
              target='_blank'
            >
              <Text pl='$2' color='$white'>
                Data
              </Text>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
