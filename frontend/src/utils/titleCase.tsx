type titleCaseProps = {
  input: string;
};
export const titleCase = ({ input }: titleCaseProps) => {
  const firstWord = input.toString().at(0)?.toUpperCase();
  const restWord = input.slice(1, input.length);
  const finalWord = firstWord + restWord;
  return finalWord as string;
};
