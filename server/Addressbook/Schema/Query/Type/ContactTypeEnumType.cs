﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Addressbook.Schema.Query.Type
{
    public class ContactTypeEnumType: GraphQL.Types.EnumerationGraphType<Data.Enumerations.ContactType>
    {
        public ContactTypeEnumType()
        {
            Name = "Type";
            Description = "Enumeration for the contact type.";
        }
    }
}
