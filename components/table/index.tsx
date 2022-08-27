import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableContainerProps,
  TablePagination,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/system';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';

import { loadSims } from '../../api';

interface VSTableProps {
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
export function VSTable(props: VSTableProps): JSX.Element {
  const { sims } = props;
  const [rows, setRow] = useState(sims.data);
  const [page, setPage] = useState(0);

  const VSTableContainer = styled(TableContainer)<TableContainerProps>({
    backgroundColor: 'white',
    width: '100%',
  });

  const handleChangePage = async (event: unknown, newPage: number) => {
    const data = await loadSims(newPage + 1);
    setRow(data.data);
    setPage(newPage);
  };

  const debouncedSearch = useRef(
    debounce(
      async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = await loadSims(1, 10, event.target.value);
        setRow(data.data);
      },
      300
    )
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <Box>
        <TextField
          label="ICCID or IMSI"
          variant="outlined"
          onChange={(event) => debouncedSearch(event)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <VSTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ICCID</TableCell>
              <TableCell>IMSI</TableCell>
              <TableCell>Batch ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.iccid}</TableCell>
                  <TableCell>{row.imsi}</TableCell>
                  <TableCell>{row.batchId}</TableCell>
                  <TableCell
                    sx={{
                      color: row.isActive ? 'green' : 'red',
                    }}
                  >
                    {row.isActive ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell>
                    <IconButton color="default">
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </VSTableContainer>
      <TablePagination
        rowsPerPageOptions={[sims.meta.page.size]}
        component="div"
        count={sims.meta.page.total}
        rowsPerPage={sims.meta.page.size}
        page={page}
        onPageChange={handleChangePage}
        showFirstButton
        showLastButton
      />
    </>
  );
}
