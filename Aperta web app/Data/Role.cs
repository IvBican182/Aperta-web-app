using System.ComponentModel.DataAnnotations;

namespace Aperta_web_app.Data
{
    public class Role
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string RoleName { get; set; }  // e.g., "Admin", "User", etc.

        // Navigation property to link users to roles
        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
