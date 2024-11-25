using Aperta_web_app.Data;
using Aperta_web_app.Models.Group;
using Aperta_web_app.Models.User;
using Aperta_web_app.Services.interfaces;
using Microsoft.EntityFrameworkCore;

namespace Aperta_web_app.Services.Implementations
{
    public class GroupService : IGroupService
    {
        private readonly AppDbContext _context;

        public GroupService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GroupsWithUsersDto>> GetGroupsWithUsersAsync(int clubId)
        {
            var groups = await _context.Groups.Where(q => q.ClubId == clubId)
           .Include(g => g.Users)
           .Select(g => new GroupsWithUsersDto
           {
               Id = g.Id,
               Name = g.Name,
               Users = g.Users.Select(u => new UserInfoDto
               {
                   Id = u.Id,
                   FirstName = $"{u.FirstName} {u.LastName}", // Assuming FirstName/LastName exist in ApplicationUser
                   Email = u.Email
               }).ToList()
           })
           .ToListAsync();

            return groups;
        }

        public async Task<List<GroupDto>> GetClubGroups(int clubId)
        {
            var groups = await _context.Groups.Where(q => q.ClubId == clubId).ToListAsync();

            if (groups.Count == 0)// Check if the list is empty
            {
                throw new Exception("No groups found!");
            }

            var groupDtos = groups.Select(group => new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            }).ToList();

            return groupDtos;


        }

        
    }
}
