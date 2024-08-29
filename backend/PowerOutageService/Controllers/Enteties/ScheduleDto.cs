namespace PowerOutageService.Controllers.Enteties;

public class ScheduleDto
{
    public int Id { get; set; }
    public string Day { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime FinishTime { get; set; }
    public int GroupId { get; set; }
}