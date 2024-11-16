using Aperta_web_app.Models.Invitations;
using Aperta_web_app.Services;
using Aperta_web_app.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aperta_web_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationController : ControllerBase
    {
        private readonly IInvitationService _invitationService;

        public InvitationController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }

        [HttpPost("send-invite")]
        public async Task<IActionResult> SendInvite([FromBody] GeneralAdminInvitationDto request)
        {
            var result = await _invitationService.SendInvitationAsync(request.Email, request.ClubId, request.RoleId);

            if (result)
                return Ok("Invitation sent successfully");

            return BadRequest("Failed to send invitation");

        }

        [HttpPost("send-user-invite")]
        public async Task<IActionResult> SendUserInvite([FromBody] UserInvitationDto request)
        {
            var result = await _invitationService.SendUserInvitationAsync(request.Email, request.ClubId, request.GroupId);

            if (result)
                return Ok("Invitation sent successfully");

            return BadRequest("Failed to send invitation");

        }
    }
}
