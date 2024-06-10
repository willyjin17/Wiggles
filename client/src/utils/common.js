const calculateAge = (date) => {
  var today = new Date();
  var dob = new Date(date);

  const ageInMilliseconds = today.getTime() - dob.getTime();

  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = (365.25 / 12) * 24 * 60 * 60 * 1000;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  var ageInYears = Math.floor(ageInMilliseconds / millisecondsPerYear);
  var ageInMonths = Math.floor(
    (ageInMilliseconds % millisecondsPerYear) / millisecondsPerMonth
  );
  var ageInDays = Math.floor(
    (ageInMilliseconds % millisecondsPerMonth) / millisecondsPerDay
  );

  return { ageInYears, ageInMonths, ageInDays };
};

export { calculateAge };
