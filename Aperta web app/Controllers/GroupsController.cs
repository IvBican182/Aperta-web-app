using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aperta_web_app.Data;
using AutoMapper;
using Aperta_web_app.Contracts;
using Aperta_web_app.Models.Group;

namespace Aperta_web_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IGroupsRepository _groupsRepository;

        public GroupsController(IMapper mapper, IGroupsRepository groupsRepository)
        {
            this._mapper = mapper;
            this._groupsRepository = groupsRepository;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            var groups = await _groupsRepository.GetAllAsync();
            var groupRecords = _mapper.Map<List<GetGroupsDto>>(groups);
            return Ok(groupRecords);
        }

        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(int id)
        {
            var group = await _groupsRepository.GetGroupDetails(id);

            if (group == null)
            {
                return NotFound();
            }

            var groupRecord = _mapper.Map<GroupDto>(group);

            return Ok(groupRecord);
        }

        // PUT: api/Groups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroup(int id, UpdateGroupDto updateGroupDto)
        {
            if (id != updateGroupDto.Id)
            {
                return BadRequest();
            }

            var group = await _groupsRepository.GetAsync(id);

            if (group == null) 
            {
                return NotFound();
            }

            _mapper.Map(updateGroupDto, group);

            try
            {
                await _groupsRepository.UpdateAsync(group);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (! await GroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Groups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Group>> PostGroup(CreateGroupDto createGroupDto)
        {
            var group = _mapper.Map<Group>(createGroupDto);
            await _groupsRepository.AddAsync(group);

            return CreatedAtAction("GetGroup", new { id = group.Id }, group);
        }

        // DELETE: api/Groups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _groupsRepository.GetAsync(id);
            if (group == null)
            {
                return NotFound();
            }

            await _groupsRepository.DeleteAsync(id);    

            return NoContent();
        }

        private async Task<bool> GroupExists(int id)
        {
            return await _groupsRepository.Exists(id);
        }
    }
}
