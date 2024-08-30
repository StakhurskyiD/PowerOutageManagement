using PowerOutageService.Enteties.Contracts;

namespace PowerOutageService.Enteties;

public class Schedule: IEntity
{
    public Guid Id { get; set; }
    public string Day { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime FinishTime { get; set; }
    public Guid GroupId { get; set; } // Foreign key
}