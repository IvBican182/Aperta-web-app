using Aperta_web_app.Data;
using Aperta_web_app.Services.interfaces;
using Microsoft.EntityFrameworkCore;

namespace Aperta_web_app.Services.Implementations
{
    public class InvitationService : IInvitationService
    {
        private readonly IEmailService _emailService;
        private readonly AppDbContext _dbContext;

        public InvitationService(IEmailService emailService, AppDbContext dbContext)
        {
            _emailService = emailService;
            _dbContext = dbContext;
            
        }

        public async Task<bool> SendInvitationAsync(string email, int clubId, string roleId)
        {
            // Generate token (you can use a GUID or JWT)
            var token = Guid.NewGuid().ToString();

            // Create invitation record
            var invitation = new GeneralAdminInvitation
            {
                Email = email,
                ClubId = clubId,
                RoleId = roleId,
                Token = token,
                CreatedAt = DateTime.UtcNow,
                IsUsed = false

            };

            _dbContext.GeneralAdminInvitations.Add(invitation);
            await _dbContext.SaveChangesAsync();

            // Send invitation email with token
            var invitationUrl = $"https://localhost:7147/register?token={token}";
            await _emailService.SendEmailAsync(email, "You're invited to join as General Admin", $"Click here to register: {invitationUrl}");

            return true;
        }

        public async Task<GeneralAdminInvitation> GetInvitationByTokenAsync(string token)
        {
            var adminInvitation = await _dbContext.GeneralAdminInvitations.FirstOrDefaultAsync(x => x.Token == token);

            if(adminInvitation == null)
            {
                return null;
            }

            return adminInvitation;
        }

        public async Task MarkAsUsedAsync(int id)
        {
            var invitation = await _dbContext.GeneralAdminInvitations.FirstOrDefaultAsync(q => q.Id == id);

            if (invitation == null)
            {
                throw new InvalidOperationException("Invitation not found.");
            }

            invitation.IsUsed = true;  // Mark the invitation as used

            _dbContext.GeneralAdminInvitations.Update(invitation);
            await _dbContext.SaveChangesAsync();

        }
    }
}
