using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class removeUsernameColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3f7909a4-3022-45b6-bf55-4f5de3ac6491");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4e3ac7e3-7a39-4516-bd74-ce1df33a013a");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b87e6c44-fa22-40eb-8ae2-5f995b70a133");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6c7fa663-539b-468f-a9c1-662fc93be6e1", null, "User", "USER" },
                    { "6f3cc473-2785-4056-94a4-ffc6e8331856", null, "Admin", "ADMIN" },
                    { "97837fbd-1480-4ea8-b49b-aa95b529ea13", null, "GeneralAdmin", "GENERALADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6c7fa663-539b-468f-a9c1-662fc93be6e1");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6f3cc473-2785-4056-94a4-ffc6e8331856");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "97837fbd-1480-4ea8-b49b-aa95b529ea13");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3f7909a4-3022-45b6-bf55-4f5de3ac6491", null, "User", "USER" },
                    { "4e3ac7e3-7a39-4516-bd74-ce1df33a013a", null, "Admin", "ADMIN" },
                    { "b87e6c44-fa22-40eb-8ae2-5f995b70a133", null, "GeneralAdmin", "GENERALADMIN" }
                });
        }
    }
}
