using PowerOutageService.Enteties.Contracts;

namespace PowerOutageService.Enteties;

public class Address: IEntity
{
    public Guid Id { get; set; }
    public string AddressName { get; set; }
    public Guid GroupId { get; set; } // Foreign key
}