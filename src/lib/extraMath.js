export function toPercent(num) {
  return Math.round(num * 10000) / 100 + "%"
}

export function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

export function binomial(hitChance, missChance, hitsDesired, totalRolls) {
  const binomialDist = (
    factorial(totalRolls) / (factorial(hitsDesired) * factorial(totalRolls - hitsDesired)) *
    hitChance ** hitsDesired * 
    missChance ** (totalRolls-hitsDesired))
  return binomialDist
}