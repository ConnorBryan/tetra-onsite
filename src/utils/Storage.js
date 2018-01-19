import localforage from 'localforage';

localforage.config({
  name: 'tetra',
  version: 1.0,
  storeName: 'tetra_web',
});

export function set(key: string, value: any, expires: number = -1) {
  return localforage.setItem(key, { expires, value });
}

export function get(key: string) {
  return localforage.getItem(key).then(item => {
    if (item && (item.expires < 0 || Date.now() < item.expires)) {
      return item.value;
    }

    if (item != null) {
      remove(key);
    }
    return null;
  });
}

export function getExpiry(key: string) {
  return localforage.getItem(key).then(item => {
    return item != null ? item.expires : null;
  });
}

export function remove(key: string) {
  return localforage.removeItem(key);
}

export function getKeys(keys: Array<string>) {
  return Promise.all(keys.map(key => get(key)));
}
