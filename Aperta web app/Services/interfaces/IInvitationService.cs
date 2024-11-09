namespace Aperta_web_app.Services.interfaces
{
    public interface IInvitationService
    {
        Task<bool> SendInvitationAsync(string email, int clubId, string roleId);
    }
}
