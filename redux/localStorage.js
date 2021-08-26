function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState =
      typeof window !== undefined
        ? localStorage.getItem("persistantState")
        : null;
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    return undefined;
  }
}

export { saveToLocalStorage, loadFromLocalStorage };
