using ContactOrganizer.Models;
using ContactOrganizer.Repository;
using ContactOrganizer.Services;
using ContactOrganizer.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using PersonManager.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ContactOrganizer
{

    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

           
            builder.Services.AddControllersWithViews();

            
            builder.Services.AddSingleton<IAddressRepository, AddressRepository>();
            builder.Services.AddScoped<IAddressService, AddressService>();

            builder.Services.AddSingleton<IContactRepository, ContactRepository>();
            builder.Services.AddScoped<IContactService, ContactService>();

            builder.Services.AddSingleton<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserService, UserService>();

            builder.Services.AddSingleton<IPersonRepository, PersonRepository>();
            builder.Services.AddScoped<IPersonService, PersonService>();
            
            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }

}
