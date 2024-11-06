using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Aperta_web_app.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Club> Clubs { get; set; }
        public DbSet<Group> Groups { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
               .HasOne(u => u.Club)
               .WithMany(c => c.Users)
               .HasForeignKey(u => u.ClubId);

            modelBuilder.Entity<User>()
               .HasOne(u => u.Group)
               .WithMany(g => g.Users)
               .HasForeignKey(u => u.GroupId);

            
        }
    }
}
