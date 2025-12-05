export function validateForm(schema: any, data: any) {
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
