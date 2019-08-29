using Microsoft.EntityFrameworkCore.Migrations;

namespace vegaApp.Migrations
{
    public partial class deletephotosTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Vehicles_VehicleId",
                table: "Photo");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "Photo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Vehicles_VehicleId",
                table: "Photo",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Vehicles_VehicleId",
                table: "Photo");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "Photo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Vehicles_VehicleId",
                table: "Photo",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
