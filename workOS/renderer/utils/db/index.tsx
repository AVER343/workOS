import { Low, LowSync, Memory } from "lowdb";
import { JSONFile, JSONFileSync } from "lowdb/node";
import { access } from "fs/promises";
import lodash from "lodash";
import {
  I_InitiativesModel,
  I_MembersModel,
  I_ProjectModel,
  I_SolutionsModel,
} from "./interfaces";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
type Initiative_Data = I_InitiativesModel[];
type Projects_Data = I_ProjectModel[];
type Solutions_Data = I_SolutionsModel[];
type Members_Data = I_MembersModel[];
const __dirname = dirname(fileURLToPath(import.meta.url));
class LowWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}
export class Database {
  initiative: LowWithLodash<Initiative_Data>;
  projects: LowWithLodash<Projects_Data>;
  solutions: LowWithLodash<Solutions_Data>;
  members: LowWithLodash<Members_Data>;
  static file = (dbName: string): string =>
    join(__dirname, `../../../data/${dbName}.json`);

  async InitiativeModels() {
    const IntitiativeAdapter = new JSONFileSync<Initiative_Data>(
      Database.file(`initiative`)
    );
    const ProjectsAdapter = new JSONFileSync<Projects_Data>(
      Database.file(`projects`)
    );
    const SolutionsAdapter = new JSONFileSync<Solutions_Data>(
      Database.file(`solutions`)
    );
    const MembersAdapter = new JSONFileSync<Members_Data>(
      Database.file(`members`)
    );
    this.initiative = new LowWithLodash<Initiative_Data>(
      IntitiativeAdapter,
      []
    );
    this.projects = new LowWithLodash<Projects_Data>(ProjectsAdapter, []);
    this.solutions = new LowWithLodash<Solutions_Data>(SolutionsAdapter, []);
    this.members = new LowWithLodash<Members_Data>(MembersAdapter, []);
    this.generateFiles();
    return this;
  }
  async generateFiles() {
    let fileNames = ["initiative", "projects", "solutions", "members"];
    for (let fileName of fileNames) {
      try {
        await access(Database.file(fileName));
      } catch (e) {
        this[fileName].write();
      }
    }
  }
}
