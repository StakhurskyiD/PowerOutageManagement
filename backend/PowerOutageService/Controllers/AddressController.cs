using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PowerOutageService.Enteties;
using PowerOutageService.Services.Contracts;

namespace PowerOutageService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        // GET: api/Address
        [HttpGet]
        public async Task<IActionResult> GetAddresses()
        {
            var addresses = await _addressService.GetAllAsync();
            return Ok(addresses);
        }

        // GET: api/Address/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddress(Guid id)
        {
            var address = await _addressService.GetByIdAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }

        // POST: api/Address
        [HttpPost]
        public async Task<IActionResult> CreateAddress([FromBody] Address address)
        {
            if (address == null)
            {
                return BadRequest("Address is null.");
            }

            var createdAddress = await _addressService.CreateAsync(address);
            return CreatedAtAction(nameof(GetAddress), new { id = createdAddress.Id }, createdAddress);
        }

        // PUT: api/Address/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAddress(Guid id, [FromBody] Address address)
        {
            if (id != address.Id)
            {
                return BadRequest("Address ID mismatch.");
            }

            var updatedAddress = await _addressService.UpdateAsync(id, address);
            if (updatedAddress == null)
            {
                return NotFound();
            }

            return Ok(updatedAddress);
        }

        // DELETE: api/Address/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(Guid id)
        {
            var success = await _addressService.DeleteAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}