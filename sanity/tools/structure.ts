import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from 'sanity/structure'
import { DocumentIcon } from '@sanity/icons'

import { getAllSingletons } from './singleton'

const singletonDocumentListItems = ({
  S,
  context,
}: {
  S: StructureBuilder
  context: StructureResolverContext
}) => {
  const docs = getAllSingletons(context.schema)

  return (
    docs?.map((schemaType) =>
      S.listItem()
        .title(context.schema.get(schemaType)?.title ?? schemaType)
        .icon(DocumentIcon)
        .child(S.document().schemaType(schemaType).id(schemaType)),
    ) || []
  )
}

const filteredDocumentListItems = ({
  S,
  context,
}: {
  S: StructureBuilder
  context: StructureResolverContext
}) => {
  const docs = getAllSingletons(context.schema)

  return S.documentTypeListItems().filter(
    (type) => docs && !docs.includes(type.getId() as string),
  )
}

export const structure: StructureResolver = (S, context) => {
  return S.list()
    .title('Content')
    .items([
      ...singletonDocumentListItems({ S, context }),
      ...filteredDocumentListItems({ S, context }),
    ])
}
