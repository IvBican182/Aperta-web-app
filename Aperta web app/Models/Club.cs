using System.ComponentModel.DataAnnotations;

namespace Aperta_web_app.Models
{
    public class Club
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        
        public required string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Country { get; set; }

        [Required]
        [MaxLength(100)]
        public required string City { get; set; }

        [Required]
        [EmailAddress]
        public required string ContactEmail { get; set; }

        [Required]
        [MaxLength(15)]
        public required string ContactPhone { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Logo { get; set; }  // Path or name of the logo file

        [Required]
        [MaxLength(100)]
        public required string Stadium { get; set; }

        [Required]
        public required bool BillingInfo { get; set; }  // true or false

        // Navigation property to link with Users if needed
        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}