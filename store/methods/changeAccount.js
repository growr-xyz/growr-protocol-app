const changeAccount = (set) => (account) => {
  if (!account) {
    set({ connected: false, account: "" });
    return;
  }

  set({ account });
};

export default changeAccount;
