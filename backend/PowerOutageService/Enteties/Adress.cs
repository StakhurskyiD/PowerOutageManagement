namespace PowerOutageService.Enteties;

public class Address
{
    public int Id { get; set; }
    public string AddressText { get; set; }
    public int GroupId { get; set; } // Foreign key
}