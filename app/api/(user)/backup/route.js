import { promises as fs } from "fs";
import moment from "moment";
import path from "path";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const dbPath = path.join(
    process.cwd(),
    `prisma/data-${process.env.ENV === "dev" ? "development" : "production"}.db`
  );
  const timestamp = moment(new Date()).format("yyyy-MM-DD_HH-mm-ss");
  const tempDir = path.join(process.cwd(), `temp-${process.env.ENV}`);
  const backupFileName = `${timestamp}_data_${process.env.ENV}.db`;
  const backupFilePath = path.join(
    process.cwd(),
    `temp-${process.env.ENV}/` + backupFileName
  );

  // Check if the temp directory exists, and create it if it doesn't
  if (!(await fs.stat(tempDir).catch(() => false))) {
    await fs.mkdir(tempDir, { recursive: true });
  }

  // Copy the database file
  await fs.copyFile(dbPath, backupFilePath);

  const fileBuffer = await fs.readFile(backupFilePath);

  // Manage backups: keep only the two most recent backups
  const files = await fs.readdir(tempDir);
  const backupFiles = files
    .filter((file) => file.endsWith(`_data_${process.env.ENV}.db`))
    .sort()
    .reverse();
  if (backupFiles.length > 2) {
    const filesToDelete = backupFiles.slice(2);
    for (const file of filesToDelete) {
      await fs.unlink(path.join(tempDir, file));
    }
  }

  return new Response(fileBuffer, {
    headers: {
      "Content-Disposition": `attachment; filename=${backupFileName}`,
      "Content-Type": "application/octet-stream",
    },
  });
}
