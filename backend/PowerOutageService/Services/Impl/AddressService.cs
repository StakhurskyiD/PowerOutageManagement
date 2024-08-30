using PowerOutageService.Enteties;
using PowerOutageService.Services.Contracts;

namespace PowerOutageService.Services
{
    public class AddressService : BaseService<Address>, IAddressService
    {
        public AddressService(AppDbContext context) : base(context)
        {
        }

        // Implement any additional methods specific to Address
    }
}