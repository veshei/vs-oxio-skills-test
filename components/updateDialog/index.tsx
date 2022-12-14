import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { loadSims, updateSIM } from '../../api';

interface VSUpdateDialogProps {
  open: boolean;
  openCallback: any;
  postCallback: any;
  row: any;
}
export default function VSUpdateDialog(
  props: VSUpdateDialogProps
): JSX.Element {
  const { open, openCallback, postCallback, row } = props;
  const [id, setID] = useState(0);
  const [batchId, setBatchId] = useState(0);
  const [iccid, setICCID] = useState('');
  const [imsi, setIMSI] = useState('');
  const [imsiError, setIMSIError] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (row) {
      setID(row.id);
      setBatchId(row.batchId);
      setICCID(row.iccid);
      setIMSI(row.imsi);
      setActive(row.isActive);
    }
  }, [row]);

  /**
   * Set IMSI state field to event value on change
   * @param event HTML input element event
   */
  const onIMSIChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIMSI(event.target.value);
  };

  /**
   * Set IMSI to state variable and do length validation of IMSI
   * @param event HTML input element
   */
  const onIMSIBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setIMSI(event.target.value);
    setIMSIError(event.target.value.length !== 15);
  };

  /**
   * Set active field to state variable
   * @param event HTML input change event
   */
  const onSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  /**
   * On save click, check for validation errors, if no errors then
   * update SIM to new information, update data field in parent, and close dialog
   */
  const onSaveClick = async () => {
    if (!imsiError) {
      const sim = {
        id: id,
        imsi: imsi,
        isActive: active,
      };
      const res = await updateSIM(sim);
      const sims = await loadSims();
      postCallback(sims);
      openCallback();
    }
  };

  return (
    row && (
      <Dialog open={open} onClose={openCallback}>
        <DialogTitle>Update SIM</DialogTitle>
        <DialogContent>
          <TextField
            key="batch-id-field"
            margin="dense"
            id="name"
            label="Batch ID"
            fullWidth
            variant="standard"
            disabled
            value={batchId}
          />
          <TextField
            key="iccid-field"
            margin="dense"
            id="name"
            label="ICCID"
            fullWidth
            variant="standard"
            disabled
            value={iccid}
          />
          <TextField
            key="imsi-field"
            margin="dense"
            id="name"
            label="IMSI"
            fullWidth
            variant="standard"
            value={imsi}
            onChange={(event) => onIMSIChange(event)}
            onBlur={(event) => onIMSIBlur(event)}
            error={imsiError}
            helperText={imsiError && 'Input must be a 15 digit number'}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={(event) => onSwitchChange(event)}
                />
              }
              label="Active"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCallback} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSaveClick} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
