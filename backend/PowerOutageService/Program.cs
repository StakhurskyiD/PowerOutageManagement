using Microsoft.EntityFrameworkCore;
using PowerOutageService;
using PowerOutageService.Services;
using PowerOutageService.Services.Contracts;

var builder = WebApplication.CreateBuilder(args);
// builder.WebHost.UseUrls("http://*:5001"); // Change to the desired port


// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policyBuilder =>
    {
        policyBuilder
            .AllowAnyOrigin() // Change to specific origins in production
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IScheduleService, ScheduleService>();

// Add services for controllers
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Automatically apply migrations at startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

// Use the CORS policy
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();