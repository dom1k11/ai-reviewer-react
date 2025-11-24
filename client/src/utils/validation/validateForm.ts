export function validateForm(schema, data) {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      data: null,
    };
  }

  return {
    valid: true,
    errors: {},
    data: result.data,
  };
}
