const capitalizeFirstLetter = (word) => {
  const firstLetter = word.charAt(0);
  const upperCaseFirstLetter = firstLetter.toUpperCase();
  const wordWithoutFirstLetter = word.slice(1);

  return upperCaseFirstLetter + wordWithoutFirstLetter;
};

export default capitalizeFirstLetter;
