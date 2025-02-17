import { definePlugin } from 'sanity'
import type { Schema, DocumentOptions } from 'sanity'

export function isSingleton(schema: Schema, schemaType: string) {
  const doc = schema._original?.types?.find(({ name }) => name === schemaType)

  return (doc?.options as DocumentOptions)?.singleton ?? false
}

export function getAllSingletons(schema: Schema) {
  const docs = schema._original?.types
    .filter(({ options }) => (options as DocumentOptions)?.singleton)
    .map((doc) => doc.name)

  return docs
}

export const singleton = definePlugin({
  name: 'singletonPlugin',
  document: {
    actions: (prev, context) =>
      isSingleton(context.schema, context.schemaType)
        ? prev.filter(({ action }) =>
            ['publish', 'discardChange', 'restore'].includes(action!),
          )
        : prev,
    newDocumentOptions: (prev, context) => {
      const singletons = getAllSingletons(context.schema)

      if (context.creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !singletons?.includes(templateItem.templateId),
        )
      }

      return singletons?.includes(context.creationContext.schemaType)
        ? prev.filter(
            (templateItem) => !singletons?.includes(templateItem.templateId),
          )
        : prev
    },
  },
})
