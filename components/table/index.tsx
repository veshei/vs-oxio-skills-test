import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableContainerProps,
  TablePagination,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

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
  openUpdateDialogCallback: any;
}
export default function VSTable(props: VSTableProps): JSX.Element {
  const { sims, handleChangePage, page, openUpdateDialogCallback } = props;
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

  const handleIconButtonClick = (event: any, row: any) => {
    openUpdateDialogCallback(row);
  };

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
                    <Button
                      variant="outlined"
                      onClick={(event) => handleIconButtonClick(event, row)}
                      key={`icon-button-${row.id}`}
                      endIcon={<EditIcon />}
                    >
                      Update SIM
                    </Button>
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
