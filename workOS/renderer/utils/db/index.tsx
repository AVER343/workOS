import { Low, LowSync, Memory } from "lowdb";
import { JSONFile, JSONFileSync } from "lowdb/node";
import { access } from "fs/promises";
import lodash from "lodash";
import os from "os";
import {
  I_InitiativesModel,
  I_MembersModel,
  I_ProjectModel,
  I_SolutionsModel,
  I_SolutionTableModel,
} from "./interfaces";
import path, { dirname, join } from "node:path";
import mkdirp from "mkdirp";
import fs from "node:fs";
import { accessSync } from "fs";
type Initiative_Data = I_InitiativesModel[];
type Projects_Data = I_ProjectModel[];
type Solutions_Data = I_SolutionsModel[];
type Members_Data = I_MembersModel[];
type Solution_Data = I_SolutionTableModel[];
class LowWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}
export class Database {
  static __dirname = path.join(os.homedir(), "Desktop");
  initiative: LowWithLodash<Initiative_Data>;
  projects: LowWithLodash<Projects_Data>;
  solutions: LowWithLodash<Solutions_Data>;
  solutionTable: LowWithLodash<Solution_Data>;
  members: LowWithLodash<Members_Data>;
  static file = (dbName: string): string =>
    join(Database.__dirname, `/data/${dbName}.json`);

  InitiativeModels() {
    this.generateFiles();
    const IntitiativeAdapter = new JSONFileSync<Initiative_Data>(
      Database.file(`initiative`)
    );
    const ProjectsAdapter = new JSONFileSync<Projects_Data>(
      Database.file(`projects`)
    );
    const SolutionsAdapter = new JSONFileSync<Solutions_Data>(
      Database.file(`solutions`)
    );
    const SolutionAdapter = new JSONFileSync<Solution_Data>(
      Database.file(`solution_table`)
    );
    const MembersAdapter = new JSONFileSync<Members_Data>(
      Database.file(`members`)
    );
    this.initiative = new LowWithLodash<Initiative_Data>(
      IntitiativeAdapter,
      []
    );
    this.solutionTable = new LowWithLodash<Solution_Data>(SolutionAdapter, []);
    this.projects = new LowWithLodash<Projects_Data>(ProjectsAdapter, []);
    this.solutions = new LowWithLodash<Solutions_Data>(SolutionsAdapter, []);
    this.members = new LowWithLodash<Members_Data>(MembersAdapter, []);
    return this;
  }
  async generateFiles() {
    let desktopPath = path.join(os.homedir(), "Desktop");
    let fileNames = [
      "initiative",
      "projects",
      "solutions",
      "members",
      "solution_table",
    ];
    for (let fileName of fileNames) {
      try {
        createFileRecursively(
          desktopPath + "/data/" + fileName + ".json",
          "[]"
        );
      } catch (e) {
        console.log([e]);
      }
    }
  }
}

async function createFileRecursively(filePath, content) {
  const directoryPath = path.dirname(filePath);
  try {
    fs.mkdirSync(directoryPath, { recursive: true });
    try {
      accessSync(filePath);
    } catch (error) {
      fs.writeFileSync(filePath, content, { encoding: "utf-8" });
    }
  } catch (error) {
    console.log({ error });
  }
}
