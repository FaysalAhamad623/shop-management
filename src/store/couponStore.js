export const coupons = [
  {
    code: "SAVE10",
    type: "percent", // percent / fixed
    value: 10,
    min: 50,
    expiry: "2026-12-31",
  },
  {
    code: "FLAT5",
    type: "fixed",
    value: 5,
    min: 20,
    expiry: "2026-12-31",
  },
  {
    code: "NEWUSER",
    type: "percent",
    value: 15,
    min: 30,
    expiry: "2026-12-31",
  },
];

export const validateCoupon = (code, total) => {
  const coupon = coupons.find(
    (c) => c.code.toLowerCase() === code.toLowerCase()
  );

  if (!coupon) return { error: "Invalid coupon ❌" };

  if (new Date() > new Date(coupon.expiry))
    return { error: "Coupon expired ❌" };

  if (total < coupon.min)
    return { error: `Minimum $${coupon.min} required ❌` };

  return { coupon };
};