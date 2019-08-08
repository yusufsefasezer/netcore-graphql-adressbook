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
        public AppSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<Query.RootQuery>();
            Mutation = resolver.Resolve<Mutation.RootMutation>();
        }
    }
}
