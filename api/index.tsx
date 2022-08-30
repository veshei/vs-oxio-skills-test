/**
 * API call to get the SIMs data for that page or for the filtered search result
 * @param pageNumber
 * @param pageSize
 * @param filterSearch
 * @returns SIMs data
 */
export async function loadSims(
  pageNumber = 1,
  pageSize = 10,
  filterSearch?: string
) {
  let res;
  if (filterSearch) {
    res = await fetch(
      `https://simulator-api.onrender.com/v1/sims?filter[search]=${filterSearch}`
    );
  } else {
    res = await fetch(
      `https://simulator-api.onrender.com/v1/sims?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  const data = await res.json();

  return data;
}

/**
 * API call to return the batches data for that page or for the filtered search results
 * @param pageNumber
 * @param pageSize
 * @param filterSearch
 * @returns Batches data
 */
export async function loadBatches(
  pageNumber = 1,
  pageSize = 10,
  filterSearch?: string
) {
  // Call an external API endpoint to get batches
  let res;
  if (filterSearch) {
    res = await fetch(
      `https://simulator-api.onrender.com/v1/batches?filter[search]=${filterSearch}`
    );
  } else {
    res = await fetch(
      `https://simulator-api.onrender.com/v1/batches?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  const data = await res.json();

  return data;
}

/**
 * API call to POST a new batch
 * @param batch
 * @returns Response from POST call to add a new batch
 */
export async function postBatch(batch: {
  name: string;
  startIccid: string;
  startImsi: string;
  count: number;
  isActive: boolean;
}) {
  const res = await fetch('https://simulator-api.onrender.com/v1/batches', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(batch),
  });
  const data = await res.json();
  return data;
}

/**
 * API call to update a SIM object
 * @param sim
 * @returns PUT response to update an individual SIM
 */
export async function updateSIM(sim: {
  id: number;
  imsi: string;
  isActive: boolean;
}) {
  const res = await fetch(
    `https://simulator-api.onrender.com/v1/sims/${sim.id}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sim),
    }
  );
  const data = await res.json();
  return data;
}
