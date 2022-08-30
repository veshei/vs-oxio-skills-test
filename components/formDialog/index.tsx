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
import { ChangeEvent, FocusEvent, useState } from 'react';
import Luhn from 'luhn-js';
import { loadSims, postBatch } from '../../api';

interface VSFormDialogProps {
  open: boolean;
  openCallback: any;
  postCallback: any;
}
export default function VSFormDialog(props: VSFormDialogProps): JSX.Element {
  const { open, openCallback, postCallback } = props;
  const [batchName, setBatchName] = useState('');
  const [batchNameError, setBatchNameError] = useState(false);
  const [iccid, setICCID] = useState('');
  const [iccidError, setICCIDError] = useState(false);
  const [imsi, setIMSI] = useState('');
  const [imsiError, setIMSIError] = useState(false);
  const [count, setCount] = useState(0);
  const [countError, setCountError] = useState(false);
  const [active, setActive] = useState(false);

  /**
   * Function that sets the batch name to state variable on blur of Batch Name form field
   * @param event HTML input element event field
   */
  const onBatchNameBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setBatchName(event.target.value);
    setBatchNameError(event.target.value === '');
  };

  /**
   * Function that performs validation on ICCID field and sets ICCID value to state variable
   * @param event HTML input element event field
   */
  const onICCIDBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (event.target.value.length === 20) {
      setICCID(event.target.value);
      setICCIDError(!Luhn.isValid(event.target.value));
    } else {
      setICCIDError(true);
    }
  };

  /**
   * Function that performs validation on IMSI field and sets IMSI value to state variable
   * @param event HTML input element event field
   */
  const onIMSIBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setIMSI(event.target.value);
    setIMSIError(event.target.value.length !== 15);
  };

  /**
   * Function that performs validation on cpimt field and sets count value to state variable
   * @param event HTML input element event field
   */
  const onCountBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const input = parseInt(event.target.value);
    if (input <= 25 && input > 0) {
      setCount(input);
      setCountError(false);
    } else {
      setCountError(true);
    }
  };

  /**
   * Function that sets active value to state variable
   * @param event HTML input element event field
   */
  const onSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  /**
   * When submit button is clicked, check if all inputs are valid,
   * POST to API, update SIMs state of parent, and close dialog
   */
  const onSubmitClick = async () => {
    if (!(batchNameError || iccidError || imsiError || countError)) {
      const batch = {
        name: batchName,
        startIccid: iccid,
        startImsi: imsi,
        count: count,
        isActive: active,
      };
      const res = await postBatch(batch);
      const sims = await loadSims();
      postCallback(sims, batchName);
      openCallback();
    }
  };

  return (
    <Dialog open={open} onClose={openCallback}>
      <DialogTitle>Add SIMs</DialogTitle>
      <DialogContent>
        <TextField
          key="batch-name-field"
          margin="dense"
          id="name"
          label="Batch Name"
          fullWidth
          variant="standard"
          onBlur={(event) => onBatchNameBlur(event)}
          error={batchNameError}
          helperText={batchNameError && 'Batch Name cannot be empty'}
        />
        <TextField
          key="iccid-field"
          margin="dense"
          id="name"
          label="ICCID Start Range"
          placeholder="ICCID (19 digits + 1 digit checksum)"
          fullWidth
          variant="standard"
          onBlur={(event) => onICCIDBlur(event)}
          error={iccidError}
          helperText={
            iccidError && 'Input must be a valid 20 digit Luhn number'
          }
        />
        <TextField
          key="imsi-field"
          margin="dense"
          id="name"
          label="IMSI Start Range"
          placeholder="IMSI (15 digits)"
          fullWidth
          variant="standard"
          onBlur={(event) => onIMSIBlur(event)}
          error={imsiError}
          helperText={imsiError && 'Input must be a 15 digit number'}
        />
        <TextField
          key="count-field"
          margin="dense"
          id="name"
          label="Count (max 25)"
          placeholder="Number of SIMs to create"
          fullWidth
          variant="standard"
          onBlur={(event) => onCountBlur(event)}
          error={countError}
          helperText={
            countError && 'Input must be a number that is between 0 and 26'
          }
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
        <Button onClick={onSubmitClick} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
