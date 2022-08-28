export async function loadSims(
  pageNumber = 1,
  pageSize = 10,
  filterSearch?: string
) {
  // Call an external API endpoint to get sims
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
