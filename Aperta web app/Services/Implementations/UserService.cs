using Aperta_web_app.Data;
using Aperta_web_app.Models.Registration;
using Aperta_web_app.Models.User;
using Aperta_web_app.Services.interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Aperta_web_app.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IInvitationService _invitationService;
        private readonly UserManager<User> _userManager; // Identity UserManager for creating users and handling passwords
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _dbContext;

        public UserService(AppDbContext dbContext, IInvitationService invitationService, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _invitationService = invitationService;
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;

        }

        public async Task<User> RegisterAdminAsync(string token, AdminRegistrationDto data)
        {

            var invitation = await _invitationService.GetAdminInvitationByTokenAsync(token);
            var newUser = new User
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                BirthDate = data.BirthDate,
                ClubId = invitation.ClubId, 
                Email = invitation.Email,
                UserName = invitation.Email
            };

            var result = await _userManager.CreateAsync(newUser, data.Password);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            var role = await _roleManager.FindByIdAsync(invitation.RoleId.ToString());
            if (role != null)
            {
                await _userManager.AddToRoleAsync(newUser, role.Name);
            }

            invitation.IsUsed = true;
            await _invitationService.MarkAsUsedAsync(invitation.Id);

            return newUser;

            
        }

        public async Task<User> RegisterUserAsync(string token, UserRegistrationDto data)
        {

            var invitation = await _invitationService.GetUserInvitationByTokenAsync(token);
            var newUser = new User
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                BirthDate = data.BirthDate,
                ClubId = invitation.ClubId,
                GroupId = invitation.GroupId,
                Email = invitation.Email,
                UserName = invitation.Email
            };

            var result = await _userManager.CreateAsync(newUser, data.Password);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            var role = await _dbContext.Roles.FirstOrDefaultAsync(q => q.Name == "User");
            if (role != null)
            {
                await _userManager.AddToRoleAsync(newUser, role.Name);
            }

            invitation.IsUsed = true;
            await _invitationService.MarkAsUsedAsync(invitation.Id);

            return newUser;


        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
    }
}
