using Aperta_web_app.Data;
using Aperta_web_app.Models.Registration;
using Aperta_web_app.Models.User;

namespace Aperta_web_app.Services.interfaces
{
    public interface IUserService
    {
        Task<User> RegisterAdminAsync(string token, AdminRegistrationDto request);

        Task<User> RegisterUserAsync(string token, UserRegistrationDto request);

        Task<bool> UserExistsAsync(string email);
    }
}
