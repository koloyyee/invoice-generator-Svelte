export async function createCustomer(body): Promise<Response | Error> {
  const result = await fetch(`${import.meta.env.VITE_BACKEND_API}/customers`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!result.ok) throw Error(result.statusText);
  return result;
}

export async function queryExistingUsers(queryObject) {
  const query = new URLSearchParams(queryObject).toString();

  const result = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/customers?${query}`,
  );

  if (!result.ok) throw Error(result.statusText);
  console.log(result);
  return result;
}

export async function getCustomers() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_API}/customers`);
    const result = await resp.json();

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
