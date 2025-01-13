export const formatBalance = (
  balanceStr: string,
  fractionDigit = 8
): string => {
  try {
    if (!balanceStr || balanceStr.trim() === "") {
      return "0";
    }

    const balance = parseFloat(balanceStr);

    if (isNaN(balance)) {
      return "0";
    }

    const rounded = balance.toFixed(fractionDigit);

    let formatted = rounded.replace(/\.?0+$/, "");

    if (formatted.endsWith(".")) {
      formatted = formatted.slice(0, -1);
    }

    return formatted;
  } catch (error) {
    // console.error("Error formatting balance:", error);
    return "0";
  }
};
