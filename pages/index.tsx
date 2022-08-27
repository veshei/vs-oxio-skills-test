import { Grid, GridProps } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/header';
import { styled } from '@mui/system';
import { loadBatches, loadSims } from '../api';
import { VSTable } from '../components/table';

export const getStaticProps: GetStaticProps = async (context) => {
  const sims = await loadSims();
  const batches = await loadBatches();
  return {
    props: {
      sims,
      batches,
    },
  };
};

const Home: NextPage = ({
  sims,
  batches,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const VSGrid = styled(Grid)<GridProps>({
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  });
  const Main = styled(Grid)<GridProps>({
    backgroundColor: 'white',
    width: '100%',
    padding: '2.5rem 5rem',
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  });

  return (
    <>
      <Head>
        <title>VS OXIO Skills Test</title>
      </Head>
      <VSGrid container>
        <Header />
        <Main>
          <VSTable sims={sims} />
        </Main>
        <footer
          style={{
            background: 'white',
            borderTop: '1px solid grey',
            height: '2.5rem',
            padding: '0.5rem 2rem',
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
            alignSelf: 'flex-end',
          }}
        >
          Veronica Shei Oxio Skills App
        </footer>
      </VSGrid>
    </>
  );
};

export default Home;
