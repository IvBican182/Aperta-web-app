﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Aperta_web_app.Migrations
{
    /// <inheritdoc />
    public partial class addIsUsedToInvitation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.AddColumn<bool>(
                name: "IsUsed",
                table: "GeneralAdminInvitations",
                type: "boolean",
                nullable: false,
                defaultValue: false);

           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.DropColumn(
                name: "IsUsed",
                table: "GeneralAdminInvitations");

            
        }
    }
}
