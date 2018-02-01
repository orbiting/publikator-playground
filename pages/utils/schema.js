export const blockSchema = (type, schema) => ({
  schema: {
    blocks: {
      [type]: schema
    }
  }
})
