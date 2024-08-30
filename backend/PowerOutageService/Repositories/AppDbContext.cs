using Microsoft.EntityFrameworkCore;
using PowerOutageService.Enteties;

namespace PowerOutageService
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Group Entity
            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("Groups");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            // Configure Address Entity
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Addresses");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.AddressName)
                    .IsRequired()
                    .HasMaxLength(200);
                entity.HasIndex(e => e.GroupId).HasDatabaseName("IX_Addresses_GroupId");

                // Foreign Key Constraint
                entity.HasOne<Group>()
                    .WithMany()
                    .HasForeignKey(e => e.GroupId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Schedule Entity
            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.ToTable("Schedules");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Day)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.StartTime).IsRequired();
                entity.Property(e => e.FinishTime).IsRequired();
                entity.HasIndex(e => e.GroupId).HasDatabaseName("IX_Schedules_GroupId");

                // Foreign Key Constraint
                entity.HasOne<Group>()
                    .WithMany()
                    .HasForeignKey(e => e.GroupId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}