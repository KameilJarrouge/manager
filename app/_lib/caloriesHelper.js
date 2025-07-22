export default function getBodyStats(
  yearOfBirth,
  height,
  weight,
  neckCircumference,
  waistCircumference,
  hipCircumference,
  sex
) {
  const age = new Date().getFullYear() - yearOfBirth;

  return {
    BMI: calculateBMI(weight, height),
    BMR: calculateBMR(weight, height, sex, age),
    bodyFat: calculateBodyFat(
      height,
      waistCircumference,
      neckCircumference,
      hipCircumference,
      sex
    ),
  };
}

function calculateBMI(weight, height) {
  const result = Number(weight) / Math.pow(Number(height) / 100, 2);
  return Math.round(result) + ` (${bmiIndex(result)})`;
}

function bmiIndex(value) {
  if (value < 18.5) return "Underweight";
  if (value >= 18.5 && value < 25) return "Healthy";
  if (value > 25 && value < 30) return "Overweight";
  if (value > 30 && value < 35) return "Obesity 1";
  if (value > 35 && value < 40) return "Obesity 2";
  if (value > 40) return "Obesity 3";
}

export function calculateBMR(weight, height, sex, age) {
  if (sex === "Male")
    return Math.round(
      13.397 * Number(weight) +
        4.799 * Number(height) -
        5.677 * Number(age) +
        88.362
    );

  return Math.round(
    9.247 * Number(weight) +
      3.098 * Number(height) -
      4.33 * Number(age) +
      447.593
  );
}

function calculateBodyFat(
  height,
  waistCircumference,
  neckCircumference,
  hipCircumference,
  sex
) {
  if (sex === "Male")
    return Math.round(
      495 /
        (1.0324 -
          0.19077 *
            Math.log10(Number(waistCircumference) - Number(neckCircumference)) +
          0.15456 * Math.log10(Number(height))) -
        450
    );

  return Math.round(
    495 /
      (1.29579 -
        0.35004 *
          Math.log10(
            Number(waistCircumference) +
              Number(hipCircumference) -
              Number(neckCircumference)
          ) +
        0.221 * Math.log10(height)) -
      450
  );
}
