using Aperta_web_app.Data;
using Aperta_web_app.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aperta_web_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerifyAdminInvitationController : ControllerBase
    {
        private readonly IInvitationService _invitationService;

        public VerifyAdminInvitationController(IInvitationService invitationService)
        {
            this._invitationService = invitationService;
            
        }
        [HttpGet("api/auth/verify-invite-token")]
        public async Task<IActionResult> VerifyInviteToken(string token)
        {
            // 1. Retrieve invitation details using the token
            var invitation = await _invitationService.GetInvitationByTokenAsync(token);

            // 2. Check if the invitation is null or expired
            if (invitation == null || invitation.IsUsed)
            {
                return BadRequest(new { message = "Invalid or expired token." });
            }

            // 3. Return the necessary details to the frontend
            return Ok(new
            {
                Email = invitation.Email,
                ClubId = invitation.ClubId,
                RoleId = invitation.RoleId,
                IsUsed = invitation.IsUsed
            });
        }
    }
}
