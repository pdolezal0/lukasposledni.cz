import 'sanity'

declare module 'sanity' {
  export interface DocumentOptions {
    singleton?: boolean
  }
}
