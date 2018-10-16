export interface MongoosePromise<T> {
  then: (
    resolve: (result: T) => void,
    reject: (err: any) => void
  ) => void
}
