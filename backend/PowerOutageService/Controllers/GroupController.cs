using Microsoft.AspNetCore.Mvc;
using PowerOutageService.Enteties;
using PowerOutageService.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PowerOutageService.Controllers.Enteties;

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
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
        {
            try
            {
                var groups = await _groupService.GetAllAsync();
                var groupDtos = groups.Select(g => new GroupDto
                {
                    Id = g.Id,
                    Name = g.Name,
                    Description = g.Description
                });

                return Ok(groupDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET: api/Group/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<GroupDto>> GetGroup(Guid id)
        {
            try
            {
                var group = await _groupService.GetByIdAsync(id);
                if (group == null)
                {
                    return NotFound($"Group with ID {id} not found.");
                }

                var groupDto = new GroupDto
                {
                    Id = group.Id,
                    Name = group.Name,
                    Description = group.Description
                };

                return Ok(groupDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // POST: api/Group
        [HttpPost]
        public async Task<ActionResult<GroupDto>> CreateGroup([FromBody] CreateGroupDto groupDto)
        {
            if (groupDto == null)
            {
                return BadRequest("Group data is null.");
            }

            try
            {
                var group = new Group
                {
                    Id = Guid.NewGuid(),
                    Name = groupDto.Name,
                    Description = groupDto.Description
                };

                var createdGroup = await _groupService.CreateAsync(group);

                var createdGroupDto = new GroupDto
                {
                    Id = createdGroup.Id,
                    Name = createdGroup.Name,
                    Description = createdGroup.Description
                };

                return CreatedAtAction(nameof(GetGroup), new { id = createdGroupDto.Id }, createdGroupDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT: api/Group/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateGroup(Guid id, [FromBody] GroupDto groupDto)
        {
            if (groupDto == null)
            {
                return BadRequest("Group data is null.");
            }

            if (id != groupDto.Id)
            {
                return BadRequest("Group ID mismatch.");
            }

            try
            {
                var groupToUpdate = new Group
                {
                    Id = groupDto.Id,
                    Name = groupDto.Name,
                    Description = groupDto.Description
                };

                var updatedGroup = await _groupService.UpdateAsync(id, groupToUpdate);

                if (updatedGroup == null)
                {
                    return NotFound($"Group with ID {id} not found.");
                }

                var updatedGroupDto = new GroupDto
                {
                    Id = updatedGroup.Id,
                    Name = updatedGroup.Name,
                    Description = updatedGroup.Description
                };

                return Ok(updatedGroupDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE: api/Group/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            try
            {
                var success = await _groupService.DeleteAsync(id);
                if (!success)
                {
                    return NotFound($"Group with ID {id} not found.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}