export const resolvers = {
  Query: {
    authorize(rootVal: any, args: any, context: any) {
      return {
        authorized: true
      };
    }
  }
};
