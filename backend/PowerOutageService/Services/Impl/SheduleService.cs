using PowerOutageService.Enteties;
using PowerOutageService.Services.Contracts;

namespace PowerOutageService.Services
{
    public class ScheduleService : BaseService<Schedule>, IScheduleService
    {
        public ScheduleService(AppDbContext context) : base(context)
        {
        }

        // Implement any additional methods specific to Schedule
    }
}