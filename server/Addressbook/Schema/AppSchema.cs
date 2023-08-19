using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;

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
