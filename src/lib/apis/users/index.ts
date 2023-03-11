import type { IIssuer } from '../../interfaces';

type AuthUser = {
  user: {
    username: string;
    password: string;
  };
};

type AccessToken = {
  access_token: string;
};

type UserProfile = {
  id: string;
  username: string;
};

export async function login(
    values: AuthUser,
): Promise<[undefined | Error, undefined | string]> {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/login`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "http://localhost:5173"
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(values.user),
    });

    const result: AccessToken = await res.json();
    debugger;
    return [undefined, result.access_token];
  } catch (error) {
    return [error, undefined];
  }
}

export async function getUserProfile(
    accessToken: string,
): Promise<[Error | undefined, UserProfile | undefined]> {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const profile = await res.json();

    return [undefined, profile];
  } catch (error) {
    return [error, undefined];
  }
}

export async function register(
    user: IIssuer,
): Promise<[Error | undefined, Response | undefined]> {
  try {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_API}/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return [undefined, result];
  } catch (error) {
    return [error, undefined];
  }
}

export async function getUserByUsername(
    username: string,
): Promise<[Error | undefined, IIssuer | undefined]> {
  try {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/${username}`,
    );
    const data = await res.json();

    const user = {
      _id: data._id,
      username: data.username,
      address: data.address,
      email: data.email,
      website: data.website,
      bankName: data.bank_name,
      bankAccount: data.bank_account,
      bankHolder: data.bank_holder,
    };

    return [undefined, user];
  } catch (error) {
    return [error, undefined];
  }
}

export async function update(id: string, value: IIssuer) {
  const {
    _id,
    username,
    email,
    website,
    address,
    bankName,
    bankAccount,
    bankHolder,
  } = value;

  const doc = {
    username,
    email,
    website,
    address,
    bank_name: bankName,
    bank_account: bankAccount,
    holder_name: bankHolder,
  };
  try {
    const result = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/${_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(doc),
        },
    );

    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
