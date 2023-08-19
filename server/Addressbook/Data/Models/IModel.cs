namespace Addressbook.Data.Models
{
    interface IModel
    {
        int Id { get; set; }
        bool IsDeleted { get; set; }
        DateTime CreateDateTime { get; set; }
        DateTime UpdateDateTime { get; set; }
    }
}
