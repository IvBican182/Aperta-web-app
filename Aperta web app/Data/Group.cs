using System.ComponentModel.DataAnnotations;

namespace Aperta_web_app.Data
{
    public class Group
    {
        [Key]
        public int Id { get; set; }

        public required string Name { get; set; }

        // Navigation property
        public ICollection<User> Users { get; set; }
    }
}
