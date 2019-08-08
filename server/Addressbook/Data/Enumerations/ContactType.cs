using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Addressbook.Data.Enumerations
{
    public enum ContactType : byte
    {
        Family = 0,
        Friends = 1,
        Relatives = 2,
        Other = 3
    }
}
