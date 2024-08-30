using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PowerOutageService.Enteties;
using PowerOutageService.Services.Contracts;

namespace PowerOutageService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        // GET: api/Group
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            var groups = await _groupService.GetAllAsync();
            return Ok(groups);
        }

        // GET: api/Group/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(Guid id)
        {
            var group = await _groupService.GetByIdAsync(id);

            if (group == null)
            {
                return NotFound();
            }

            return Ok(group);
        }

        // POST: api/Group
        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup([FromBody] Group group)
        {
            if (group == null)
            {
                return BadRequest("Group is null.");
            }

            var createdGroup = await _groupService.CreateAsync(group);
            return CreatedAtAction(nameof(GetGroup), new { id = createdGroup.Id }, createdGroup);
        }

        // PUT: api/Group/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(Guid id, [FromBody] Group group)
        {
            if (id != group.Id)
            {
                return BadRequest("Group ID mismatch.");
            }

            var updatedGroup = await _groupService.UpdateAsync(id, group);
            if (updatedGroup == null)
            {
                return NotFound();
            }

            return Ok(updatedGroup);
        }

        // DELETE: api/Group/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            var success = await _groupService.DeleteAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}