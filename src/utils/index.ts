export const calculateFare = (distance: number, fare: number) => {
  return distance * fare;
};

export const calculateProfit = (
  distance: number,
  fare: number,
  amount: number,
  price: number
) => {
  let expenses = distance * fare;
  let gross = amount * price;

  return gross - expenses;
};
