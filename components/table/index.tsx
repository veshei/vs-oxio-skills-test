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
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';

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
  handleChangePage: any;
  page: number;
}
export default function VSTable(props: VSTableProps): JSX.Element {
  const { sims, handleChangePage, page } = props;
  const [data, setData] = useState(sims);

  const VSTableContainer = styled(TableContainer)<TableContainerProps>({
    backgroundColor: 'white',
    width: '100%',
  });

  useEffect(() => {
    if (sims) {
      setData(sims);
    }
  }, [sims]);

  return (
    <>
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
            {data &&
              data.data.map((row) => (
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
      {data && (
        <TablePagination
          rowsPerPageOptions={[data.meta.page.size]}
          component="div"
          count={data.meta.page.total}
          rowsPerPage={data.meta.page.size}
          page={page}
          onPageChange={handleChangePage}
          showFirstButton
          showLastButton
        />
      )}
    </>
  );
}
