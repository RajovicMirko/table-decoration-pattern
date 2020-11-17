export const data = Array.from({ length: 200000 }, (val, i) => {
  const num = i + 1;

  return {
    id: num,
    fullName: `Full name ${num}`,
    email: `Email${num}@gmail.com`,
    phone: `Phone ${num}`,
  };
});
