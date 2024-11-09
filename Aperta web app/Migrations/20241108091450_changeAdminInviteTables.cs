using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class changeAdminInviteTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "GeneralAdminInvitations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    ClubId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralAdminInvitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GeneralAdminInvitations_Clubs_ClubId",
                        column: x => x.ClubId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GeneralAdminInvitations_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "054f9e5f-6191-4b5a-97ae-8f305c86e216", null, "User", "USER" },
                    { "30e49d28-635e-4838-ac2c-5c4157073b53", null, "GeneralAdmin", "GENERALADMIN" },
                    { "7a56e4da-8f30-4412-9d75-de57ba7b9231", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_GeneralAdminInvitations_ClubId",
                table: "GeneralAdminInvitations",
                column: "ClubId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralAdminInvitations_RoleId",
                table: "GeneralAdminInvitations",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GeneralAdminInvitations");

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

            migrationBuilder.CreateTable(
                name: "AdminInviteTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false)
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
    }
}
