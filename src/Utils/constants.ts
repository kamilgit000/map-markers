export const headerHeight = 50;
export const appLayoutBreakpoint = 900;

// range -90 <-> 90
export const latituteValidation =
  /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
//range -180 <-> 180
export const longituteValidation = new RegExp(
  /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
);
