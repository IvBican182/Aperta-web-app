using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class updateGeneralAdminInvite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "054f9e5f-6191-4b5a-97ae-8f305c86e216");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "30e49d28-635e-4838-ac2c-5c4157073b53");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "7a56e4da-8f30-4412-9d75-de57ba7b9231");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "31965bfe-f09f-407c-be19-e15b509042b1", null, "User", "USER" },
                    { "6274c1a4-4987-4108-8664-a3545566aeb9", null, "Admin", "ADMIN" },
                    { "6993f94f-2de6-41bc-be18-0f78bfaee9a5", null, "GeneralAdmin", "GENERALADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "31965bfe-f09f-407c-be19-e15b509042b1");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6274c1a4-4987-4108-8664-a3545566aeb9");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6993f94f-2de6-41bc-be18-0f78bfaee9a5");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "054f9e5f-6191-4b5a-97ae-8f305c86e216", null, "User", "USER" },
                    { "30e49d28-635e-4838-ac2c-5c4157073b53", null, "GeneralAdmin", "GENERALADMIN" },
                    { "7a56e4da-8f30-4412-9d75-de57ba7b9231", null, "Admin", "ADMIN" }
                });
        }
    }
}
