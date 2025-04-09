import React from "react";

const defaultRequirements = [
  /^.{8,}$/,    // minimum 8 characters
  /[A-Z]/,      // at least one uppercase letter
  /[a-z]/,      // at least one lowercase letter
  /\d/,         // at least one digit
  /[\W_]/       // at least one special character
];

const defaultLabels = [
  "Weak",
  "Medium",
  "Good",
  "Strong",
]

const defaultColors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
]

function calculateStrength(password: string, requirements: Array<RegExp>): number {
  let score = 0;
  for (const requirement of requirements) {
    if (requirement.test(password)) {
      score++;
    }
  }
  if (score === requirements.length-1 && password.length < 8) {
    score--
  }
  return (score / requirements.length) * 100;
}


function getStrengthLabel(strength: number, labels: Array<string>): string {
  let brackets = 100 / labels.length;
  for (let i = 0; i < labels.length; i++) {
    if (strength < brackets * (i + 1)) {
      return labels[i];
    }
  }
  return labels[labels.length - 1];
}


function getBarColor(strength: number, colors: Array<string>): string {
  let brackets = 100 / colors.length;
  for (let i = 0; i < colors.length; i++) {
    if (strength < brackets * (i + 1)) {
      return colors[i];
    }
  }
  return colors[colors.length - 1];
}

interface PasswordStrengthProps {
  password: string;
  labels?: Array<string>;
  colors?: Array<string>;
  requirements?: Array<RegExp>;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ( {
  password,
  labels = defaultLabels,
  colors = defaultColors,
  requirements = defaultRequirements}
 ) => {
  const strength = calculateStrength(password, requirements);
  return (
    <div className="mt-2">
      <div className="flex gap-1 w-full h-2">
        {labels.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-full rounded ${index < strength / 25 ? getBarColor(strength, colors) : "bg-gray-200"}`}
            style={{ width: `${100 / labels.length}%` }}
          ></div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">{getStrengthLabel(strength, labels)}</p>
    </div>
  );
};

export { defaultRequirements, defaultColors, defaultLabels }
export default PasswordStrength;