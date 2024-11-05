using Aperta_web_app.Models;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Aperta_web_app.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(u => u.Club)
                .WithMany(c => c.Users)
                .HasForeignKey(u => u.ClubId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Group)
                .WithMany(g => g.Users)
                .HasForeignKey(u => u.GroupId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Role) // A User has one Role
                .WithMany(r => r.Users) // A Role can have many Users (this is implicit)
                .HasForeignKey(u => u.RoleId); // The foreign key in User is RoleId

            // Optional: Seeding roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, RoleName = "GeneralAdmin" },
                new Role { Id = 2, RoleName = "ClubAdmin" },
                new Role { Id = 3, RoleName = "User" }
            );
        }
    }
}
