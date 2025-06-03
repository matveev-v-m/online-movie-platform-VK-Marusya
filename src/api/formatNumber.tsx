export function formatNumber(numberString: string): string {
  const number = Number(numberString).toFixed(2);
  const [integerPart] = number.split(".");
  const formattedInteger = formatWithThousandSeparators(integerPart);

  return formattedInteger;
}

function formatWithThousandSeparators(numberStr: string): string {
  let result = "";
  const length = numberStr.length;

  for (let i = 0; i < length; i++) {
    const reversedIndex = length - 1 - i;

    if (i > 0 && i % 3 === 0) {
      result = " " + result;
    }

    result = numberStr[reversedIndex] + result;
  }

  return result;
}

export function formatMovieDuration(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  let result = "";
  if (hours > 0) {
    result += `${hours} ч `;
  }
  if (minutes > 0 || hours === 0) {
    result += `${minutes} мин`;
  }

  return result.trim();
}
