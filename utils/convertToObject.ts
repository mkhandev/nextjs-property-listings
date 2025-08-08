export function convertToSerializeAbleObject(leanDocument: any) {
  if (leanDocument == null || typeof leanDocument !== "object") {
    return leanDocument;
  }

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];
    if (
      value !== null &&
      value !== undefined &&
      value.toJSON &&
      value.toString
    ) {
      leanDocument[key] = value.toString();
    }
  }
  return leanDocument;
}
