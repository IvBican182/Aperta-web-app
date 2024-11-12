using Aperta_web_app.Data;

namespace Aperta_web_app.Services.interfaces
{
    public interface IInvitationService
    {
        Task<bool> SendInvitationAsync(string email, int clubId, string roleId);

        Task<GeneralAdminInvitation> GetInvitationByTokenAsync(string token);

        Task MarkAsUsedAsync(int id);
    }
}
