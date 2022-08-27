export async function loadSims(
  pageNumber = 1,
  pageSize = 10,
  filterSearch?: number
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
