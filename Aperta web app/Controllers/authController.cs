using Aperta_web_app.Models.Registration;
using Aperta_web_app.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aperta_web_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class authController : ControllerBase
    {
        private readonly IInvitationService _invitationService;
        private readonly IUserService _userService;

        public authController(IInvitationService invitationService, IUserService userService)
        {
            _invitationService = invitationService;
            _userService = userService;
            
        }
        [HttpPost("api/auth/register")]
        public async Task<IActionResult> RegisterAdmin([FromBody] AdminRegistrationDto request)
        {
            // Step 1: Validate the invitation token
            var invitation = await _invitationService.GetAdminInvitationByTokenAsync(request.Token);
            if (invitation == null || invitation.IsUsed)
            {
                return BadRequest(new { message = "Invalid or expired invitation token." });
            }

            // Step 2: Check if the email already exists
            bool userExists = await _userService.UserExistsAsync(invitation.Email);
            if (userExists)
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            // Step 3: Proceed with user registration
            try
            {
                var user = await _userService.RegisterAdminAsync(request.Token, request);
                return Ok(new { message = "Registration successful!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Failed to register user: {ex.Message}" });
            }
        }

        [HttpPost("api/auth/registerUser")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto request)
        {
            // Step 1: Validate the invitation token
            var invitation = await _invitationService.GetUserInvitationByTokenAsync(request.Token);
            if (invitation == null || invitation.IsUsed)
            {
                return BadRequest(new { message = "Invalid or expired invitation token." });
            }

            // Step 2: Check if the email already exists
            bool userExists = await _userService.UserExistsAsync(invitation.Email);
            if (userExists)
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            // Step 3: Proceed with user registration
            try
            {
                var user = await _userService.RegisterUserAsync(request.Token, request);
                return Ok(new { message = "Registration successful!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Failed to register user: {ex.Message}" });
            }
        }
    }
}
