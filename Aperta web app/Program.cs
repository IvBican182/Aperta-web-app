using Aperta_web_app.Configurations;
using Aperta_web_app.Contracts;
using Aperta_web_app.Data;
using Aperta_web_app.Repository;
using Aperta_web_app.Services;
using Aperta_web_app.Services.Implementations;
using Aperta_web_app.Services.interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient<MailgunEmailService>();

builder.Services.AddSingleton<IEmailService>(provider =>
            new MailgunEmailService(
            builder.Configuration["Mailgun:ApiKey"],
               builder.Configuration["Mailgun:Domain"],
                provider.GetRequiredService<HttpClient>()
           ));

builder.Services.AddScoped<IInvitationService, InvitationService>();



var apiKey = builder.Configuration["Mailgun:ApiKey"];
var domain = builder.Configuration["Mailgun:Domain"];
Console.WriteLine($"Extracted API Key: {apiKey}");
Console.WriteLine($"Extracted Domain: {domain}");
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // Your frontend URL
              .AllowAnyHeader()
              .AllowAnyOrigin()
              .AllowAnyMethod();
    });
});




builder.Services.AddAutoMapper(typeof(AutoMapperConfig));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IClubsRepository, ClubsRepository>();
builder.Services.AddScoped<IGroupsRepository, GroupsRepository>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

// Add controllers, endpoints, etc.
builder.Services.AddControllers();

var app = builder.Build();



//var emailService = app.Services.GetRequiredService<IEmailService>();
//await (emailService as MailgunEmailService).SendEmailAsync();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
