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
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        // GET: api/Schedule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedules()
        {
            var schedules = await _scheduleService.GetAllAsync();
            return Ok(schedules);
        }

        // GET: api/Schedule/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Schedule>> GetSchedule(Guid id)
        {
            var schedule = await _scheduleService.GetByIdAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }

        // POST: api/Schedule
        [HttpPost]
        public async Task<ActionResult<Schedule>> CreateSchedule([FromBody] Schedule schedule)
        {
            if (schedule == null)
            {
                return BadRequest("Schedule is null.");
            }

            var createdSchedule = await _scheduleService.CreateAsync(schedule);
            return CreatedAtAction(nameof(GetSchedule), new { id = createdSchedule.Id }, createdSchedule);
        }

        // PUT: api/Schedule/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchedule(Guid id, [FromBody] Schedule schedule)
        {
            if (id != schedule.Id)
            {
                return BadRequest("Schedule ID mismatch.");
            }

            var updatedSchedule = await _scheduleService.UpdateAsync(id, schedule);
            if (updatedSchedule == null)
            {
                return NotFound();
            }

            return Ok(updatedSchedule);
        }

        // DELETE: api/Schedule/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule(Guid id)
        {
            var success = await _scheduleService.DeleteAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}