import {
  Box,
  TextField,
  InputAdornment,
  BoxProps,
  Button,
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/system';
import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { loadSims } from '../../api';
import VSFormDialog from '../../components/formDialog';
import VSTable from '../../components/table';
import VSUpdateDialog from '../../components/updateDialog';

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
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [updateDialogRow, setUpdateDialogRow] = useState();
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  const Container = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5rem 5rem',
  });

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

  const postCallback = (d: any, batchName: string) => {
    setData(d);
    setShowAlert(true);
    setBatchName(batchName);
  };

  const openUpdateDialogCallback = (row: any) => {
    setOpenUpdateDialog(!openUpdateDialog);
    setUpdateDialogRow(row);
  };

  const postUpdateCallback = (d: any) => {
    setData(d);
    setShowUpdateAlert(true);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    const data = await loadSims(newPage + 1);
    setData(data);
    setPage(newPage);
  };

  return (
    <>
      <Collapse in={showAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {`${batchName} was successfully created!`}
        </Alert>
      </Collapse>
      <Collapse in={showUpdateAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowUpdateAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          SIM was successfully updated!
        </Alert>
      </Collapse>
      <Container>
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
        <VSTable
          sims={data}
          handleChangePage={handleChangePage}
          page={page}
          openUpdateDialogCallback={openUpdateDialogCallback}
        />
        <VSFormDialog
          open={openDialog}
          openCallback={openDialogCallback}
          postCallback={postCallback}
        />
        <VSUpdateDialog
          open={openUpdateDialog}
          openCallback={openUpdateDialogCallback}
          postCallback={postUpdateCallback}
          row={updateDialogRow}
        />
      </Container>
    </>
  );
}
