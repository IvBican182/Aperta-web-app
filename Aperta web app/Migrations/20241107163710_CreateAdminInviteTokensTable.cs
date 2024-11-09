using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class CreateAdminInviteTokensTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "7e894fec-5710-4803-bbe5-694c0fd69d4f", null, "User", "USER" },
                    { "b9299556-d01b-4c86-a7f3-b720e5c84d45", null, "Admin", "ADMIN" },
                    { "de7a051b-d067-478a-b4a3-02a35e5ee030", null, "GeneralAdmin", "GENERALADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "7e894fec-5710-4803-bbe5-694c0fd69d4f");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b9299556-d01b-4c86-a7f3-b720e5c84d45");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "de7a051b-d067-478a-b4a3-02a35e5ee030");

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
    }
}
