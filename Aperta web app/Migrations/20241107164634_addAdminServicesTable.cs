using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class addAdminServicesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "AdminInviteTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminInviteTokens", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1dfe75f4-6c65-4813-9e23-9dbdb5321f7c", null, "Admin", "ADMIN" },
                    { "a54ccb71-72a1-4990-960a-ca43bddf8cb8", null, "GeneralAdmin", "GENERALADMIN" },
                    { "e40f81ce-c421-4262-aa76-224bb5f766c6", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminInviteTokens");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "1dfe75f4-6c65-4813-9e23-9dbdb5321f7c");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a54ccb71-72a1-4990-960a-ca43bddf8cb8");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e40f81ce-c421-4262-aa76-224bb5f766c6");

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
    }
}
