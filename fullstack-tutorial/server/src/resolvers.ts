export default {
  Query: {
    launches: (_: any, __: any, { dataSources }: any) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_: any, { id }: any, { dataSources }: any) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_: any, __: any, { dataSources }: any) =>
      dataSources.userAPI.findOrCreateUser(),
  },
};
