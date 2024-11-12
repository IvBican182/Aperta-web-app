using Aperta_web_app.Data.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Numerics;

namespace Aperta_web_app.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Club> Clubs { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GeneralAdminInvitation> GeneralAdminInvitations { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());

            modelBuilder.Entity<User>()
               .HasOne(u => u.Club)
               .WithMany(c => c.Users)
               .HasForeignKey(u => u.ClubId);

            modelBuilder.Entity<User>()
               .HasOne(u => u.Group)
               .WithMany(g => g.Users)
               .HasForeignKey(u => u.GroupId);


            modelBuilder.Entity<GeneralAdminInvitation>()
                .HasOne(i => i.Club)
                .WithMany()                     // Assuming no navigation back to Invitations in Club
                .HasForeignKey(i => i.ClubId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GeneralAdminInvitation>()
                .HasOne(g => g.Role)  
                .WithMany()  
                .HasForeignKey(g => g.RoleId)  
                .OnDelete(DeleteBehavior.Restrict);




        }
    }
}
