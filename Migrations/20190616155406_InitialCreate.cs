using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace vegaApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Makes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Makes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(maxLength: 255, nullable: false),
                    makeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.id);
                    table.ForeignKey(
                        name: "FK_Models_Makes_makeId",
                        column: x => x.makeId,
                        principalTable: "Makes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "Feature1" },
                    { 2, "Feature2" },
                    { 3, "Feature3" }
                });

            migrationBuilder.InsertData(
                table: "Makes",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "Make1" },
                    { 2, "Make2" },
                    { 3, "Make3" }
                });

            migrationBuilder.InsertData(
                table: "Models",
                columns: new[] { "id", "makeId", "name" },
                values: new object[] { 3, 1, "Model3" });

            migrationBuilder.InsertData(
                table: "Models",
                columns: new[] { "id", "makeId", "name" },
                values: new object[] { 2, 2, "Model2" });

            migrationBuilder.InsertData(
                table: "Models",
                columns: new[] { "id", "makeId", "name" },
                values: new object[] { 1, 3, "Model1" });

            migrationBuilder.CreateIndex(
                name: "IX_Models_makeId",
                table: "Models",
                column: "makeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "Makes");
        }
    }
}
