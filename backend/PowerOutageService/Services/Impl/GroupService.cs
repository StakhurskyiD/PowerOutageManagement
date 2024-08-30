using PowerOutageService.Services.Contracts;
using PowerOutageService.Enteties;

namespace PowerOutageService.Services
{
    public class GroupService : BaseService<Group>, IGroupService
    {
        public GroupService(AppDbContext context) : base(context)
        {
        }
    }
}