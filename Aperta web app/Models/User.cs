using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Aperta_web_app.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public required string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public required string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        [MaxLength(50)]
        public string? ParentFirstName { get; set; }

        [MaxLength(50)]
        public string? ParentLastName { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Password { get; set; }

        public bool? BillingDetails { get; set; }  // true or false

        // Foreign key relationships
        [ForeignKey("Club")]
        public int ClubId { get; set; }
        public virtual Club Club { get; set; }

        [ForeignKey("Group")]
        public int? GroupId { get; set; }
        public virtual Group? Group { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }  // Foreign key for Role
        public virtual Role Role { get; set; }
    }
}
