namespace Aperta_web_app.Models.User
{
    public class UserDto
    {
        public int Id { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        public required string Email { get; set; }


    }
}
