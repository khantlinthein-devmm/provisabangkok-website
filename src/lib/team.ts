import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

/** Staff and group photos, edited at /keystatic/ under "Team & photos". */
export async function getTeam() {
  const team = await createReader(process.cwd(), config).singletons.team.read();
  return { staff: team?.staff ?? [], groupPhotos: team?.groupPhotos ?? [] };
}
