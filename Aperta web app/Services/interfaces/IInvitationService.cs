using Aperta_web_app.Data;

namespace Aperta_web_app.Services.interfaces
{
    public interface IInvitationService
    {
        Task<bool> SendInvitationAsync(string email, int clubId, string roleId);

        Task<bool> SendUserInvitationAsync(string email, int clubId, int groupId);

        Task<GeneralAdminInvitation> GetAdminInvitationByTokenAsync(string token);

        Task<UserInvitation> GetUserInvitationByTokenAsync(string token);

        Task MarkAsUsedAsync(int id);
    }
}
