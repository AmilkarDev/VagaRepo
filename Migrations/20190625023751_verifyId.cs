using Microsoft.EntityFrameworkCore.Migrations;

namespace vegaApp.Migrations
{
    public partial class verifyId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_Vehicleid",
                table: "VehicleFeatures");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Vehicles",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Vehicleid",
                table: "VehicleFeatures",
                newName: "VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_Vehicleid",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Vehicles",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "VehicleFeatures",
                newName: "Vehicleid");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_VehicleId",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_Vehicleid");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_Vehicleid",
                table: "VehicleFeatures",
                column: "Vehicleid",
                principalTable: "Vehicles",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
