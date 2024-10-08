export const eliminateEndingString = (s) => {
    const lastIndex = s.lastIndexOf(",");
    return typeof lastIndex === "string" ? s.slice(0, lastIndex) : s;
  };
  