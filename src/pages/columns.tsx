// import type { Model, Options, Profile, Route } from '@prisma/client'

// import type { ColumnDef } from '@tanstack/react-table'

const route = [
  {
    accessorKey: 'server',
    header: 'server',
  },
  {
    accessorKey: 'target',
    header: 'target',
  },
  {
    accessorKey: 'keyword',
    header: 'keyword',
  },
  {
    accessorKey: 'startsWithKeyword',
    header: 'starts with',
  },
  {
    accessorKey: 'mentionsKeyword',
    header: 'mentions',
  },
  {
    accessorKey: 'handler',
    header: 'handler',
  },
  {
    accessorKey: 'overrideOutputTarget',
    header: 'override output target',
  },
  {
    accessorKey: 'profileID',
    header: 'profile ID',
  },
  {
    accessorKey: 'modelID',
    header: 'model ID',
  },
]

export const columns = { route }
