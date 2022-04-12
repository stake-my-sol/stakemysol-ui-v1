export const saveToLocalStorage = (key: string, state: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    const stateStr: string | null = localStorage.getItem(key);
    return stateStr ? JSON.parse(stateStr) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
