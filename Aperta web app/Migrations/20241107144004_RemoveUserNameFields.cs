using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserNameFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "8378c9b3-b493-4a44-8d92-b7bb4a6c271b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "9cf6023b-85c1-4b32-9c06-ec3aa88040bf");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f7ccfdad-aa4d-4ba6-86bf-e7f773c9239c");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NormalizedUserName",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256,
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<string>(
                name: "NormalizedUserName",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8378c9b3-b493-4a44-8d92-b7bb4a6c271b", null, "User", "USER" },
                    { "9cf6023b-85c1-4b32-9c06-ec3aa88040bf", null, "Admin", "ADMIN" },
                    { "f7ccfdad-aa4d-4ba6-86bf-e7f773c9239c", null, "GeneralAdmin", "GENERALADMIN" }
                });
        }
    }
}
