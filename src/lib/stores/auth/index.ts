import { push } from 'svelte-spa-router';
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const hasAccount = writable(false);
export const currentUser = writable(null);

export const logout = () => {
  localStorageUsername.set(null);
  currentUser.set(null);
  isAuthenticated.set(false);
  localStorage.clear();
  push('/auth');
};

export function setHasAccount() {
  hasAccount.update((value) => (value = !value));
}

const appUser = localStorage.getItem('appUser');

export const localStorageUsername = writable(
  appUser ? JSON.parse(appUser) : null,
);

localStorageUsername.subscribe((value) => {
  if (value) return localStorage.setItem('appUser', JSON.stringify(value));
  else return localStorage.removeItem('appUser');
});
