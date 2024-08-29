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

            // Configuring Group Entity
            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("Groups");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Description).IsRequired();
            });

            // Configuring Address Entity
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Addresses");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.AddressText).IsRequired();
                entity.HasIndex(e => e.GroupId).HasDatabaseName("IX_Addresses_GroupId");

                // Define Foreign Key Constraint
                entity.HasOne<Group>()
                    .WithMany()
                    .HasForeignKey(e => e.GroupId)
                    .OnDelete(DeleteBehavior.Restrict); // or you can choose Cascade depending on your use case
            });

            // Configuring Schedule Entity
            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.ToTable("Schedules");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Day).IsRequired();
                entity.Property(e => e.StartTime).IsRequired();
                entity.Property(e => e.FinishTime).IsRequired();
                entity.HasIndex(e => e.GroupId).HasDatabaseName("IX_Schedules_GroupId");

                // Define Foreign Key Constraint
                entity.HasOne<Group>()
                    .WithMany()
                    .HasForeignKey(e => e.GroupId)
                    .OnDelete(DeleteBehavior.Restrict); // or Cascade depending on your use case
            });
        }
    }
}