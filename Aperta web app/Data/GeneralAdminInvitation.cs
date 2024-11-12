using Microsoft.AspNetCore.Identity;

namespace Aperta_web_app.Data
{
    public class GeneralAdminInvitation
    {
        public int Id { get; set; }             // Primary key for the Invitation
        public string Email { get; set; }        // Email of the invitee
        // Foreign key to Club
        public int ClubId { get; set; }
        public Club Club { get; set; }           // Navigation property to Club
        // Foreign key to Identity's Role table, but without navigation property
        public string RoleId { get; set; }
        public IdentityRole Role { get; set; }// RoleId is typically a string in Identit
        public string Token { get; set; }        // Token to verify invitation
        public DateTime CreatedAt { get; set; }
        public bool IsUsed { get; set; } //checks to see if our user used the token
    }
}
