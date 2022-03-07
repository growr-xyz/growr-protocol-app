const toggleOverlay =
  (set) =>
  async (type = "") => {
    if (type) {
      set({
        overlay: {
          active: true,
          type,
        },
      });
      return;
    }
    set({
      overlay: {
        active: false,
        type: "",
      },
    });
  };

export default toggleOverlay;
