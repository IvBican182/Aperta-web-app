using Aperta_web_app.Data;
using Aperta_web_app.Models.Group;

namespace Aperta_web_app.Services.interfaces
{
    public interface IGroupService
    {
        Task<List<GroupsWithUsersDto>> GetGroupsWithUsersAsync(int clubId);

        Task<List<GroupDto>> GetClubGroups(int clubId);

        //Task<Group> PostGroup(CreateGroupDto data);
    }
}
