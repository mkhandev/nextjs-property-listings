export const isValidLatLng = (
  latInput: string | number | undefined | null,
  lngInput: string | number | undefined | null
): boolean => {
  // 1. Check for null, undefined, or empty string
  if (
    latInput === null ||
    latInput === undefined ||
    latInput === "" ||
    lngInput === null ||
    lngInput === undefined ||
    lngInput === ""
  ) {
    return false;
  }

  // 2. Trim if string
  const latStr = typeof latInput === "string" ? latInput.trim() : latInput;
  const lngStr = typeof lngInput === "string" ? lngInput.trim() : lngInput;

  // 3. Convert to float - convert to string first to avoid errors
  const lat = parseFloat(latStr.toString());
  const lng = parseFloat(lngStr.toString());

  // 4. Validate range, decimal, and number
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat.toString().includes(".") &&
    lng.toString().includes(".") &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};
