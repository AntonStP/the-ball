const defaultStorage = {
  setItem(key, value) {
    this[key] = value;
  },
  getItem(key) {
    return this[key];
  }
};

export default function storage(key, onUpdate, storageType) {
  let localStorage = defaultStorage;

  try {
    localStorage = global[storageType] ?? global.localStorage ?? defaultStorage;
  } catch (e) {
  }
  const update = (data) => {
    if (typeof onUpdate === "function") {
      onUpdate(data);
    }
  };

  return {
    save(data) {
      if (data) {
        localStorage?.setItem(key, JSON.stringify(data));
      } else {
        localStorage?.removeItem(key);
      }
      update(data);
    },
    load() {
      try {
        const info = JSON.parse(localStorage?.getItem(key));
        update(info);
        return info;
      } catch (e) {
      }

      return {};
    }
  }
}

