namespace Addressbook.Schema
{
    public class AppSchema : GraphQL.Types.Schema
    {
        public AppSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetService<Query.RootQuery>();
            Mutation = serviceProvider.GetService<Mutation.RootMutation>();
        }
    }
}
