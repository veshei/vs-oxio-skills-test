import {
  Box,
  TextField,
  InputAdornment,
  BoxProps,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { loadSims } from '../../api';
import VSFormDialog from '../../components/formDialog';
import VSTable from '../../components/table';

interface TableSectionProps {
  sims: {
    data: {
      batchId: number;
      createdAt: string;
      iccid: string;
      id: number;
      imsi: string;
      isActive: boolean;
      updatedAt: string;
    }[];
    meta: {
      page: {
        number: number;
        size: number;
        total: number;
      };
    };
  };
}

export default function TableSection(props: TableSectionProps): JSX.Element {
  const { sims } = props;
  const [data, setData] = useState(sims);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState('');

  const HeaderBox = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const onSearch = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchVal(event.target.value);
    if (event.target.value !== '') {
      const data = await loadSims(1, 10, event.target.value);
      setData(data);
    } else {
      setData(sims);
    }
  };

  const onAddSimsClick = () => {
    setOpenDialog(true);
  };

  const openDialogCallback = () => {
    setOpenDialog(!open);
  };

  const postCallback = (d: any) => {
    setData(d);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    const data = await loadSims(newPage + 1);
    setData(data);
    setPage(newPage);
  };

  return (
    <>
      <HeaderBox>
        <TextField
          key="search-sims-field"
          label="ICCID or IMSI"
          variant="outlined"
          onChange={(event) => onSearch(event)}
          value={searchVal}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={onAddSimsClick}
          key="add-sim-button"
        >
          Add SIMs
        </Button>
      </HeaderBox>
      <VSTable sims={data} handleChangePage={handleChangePage} page={page} />
      <VSFormDialog
        open={openDialog}
        openCallback={openDialogCallback}
        postCallback={postCallback}
      />
    </>
  );
}
