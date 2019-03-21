import * as vm from "azure-devops-node-api";
import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

require("dotenv").config();

function getEnv(name: string): string {
  let val = process.env[name];
  if (!val) {
    console.error(`${name} env var not set`);
    process.exit(1);
    return "";
  }
  return val;
}

export async function getWebApi(): Promise<vm.WebApi> {
  let serverUrl = getEnv("API_URL");
  return await getApi(serverUrl);
}

export async function getApi(serverUrl: string): Promise<vm.WebApi> {
  return new Promise<vm.WebApi>(async (resolve, reject) => {
    try {
      let token = getEnv("API_TOKEN");
      let authHandler = vm.getPersonalAccessTokenHandler(token);
      let option = undefined;

      let vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler, option);
      let connData: lim.ConnectionData = await vsts.connect();
      if (connData.authenticatedUser != undefined) {
        console.log(`Hello ${connData.authenticatedUser.providerDisplayName}`);
      }
      resolve(vsts);
    } catch (err) {
      reject(err);
    }
  });
}

export function getProject(): string {
  return getEnv("API_PROJECT");
}

export function banner(title: string): void {
  console.log("=======================================");
  console.log(`\t${title}`);
  console.log("=======================================");
}

export function heading(title: string): void {
  console.log();
  console.log(`> ${title}`);
}

banner("PR Helper");
getWebApi().then(res => {
  res.getGitApi().then(git => {
    // let criteria = new GitPullRequestSearchCriteria;
    git.getPullRequestsByProject("OSD", {}).then(prs => {
      console.log(prs);
      if (prs.length) {
        prs.forEach(pr => {
          if (pr.reviewers && pr.reviewers.length) {
            pr.reviewers.forEach(r => {
              console.log(r);
            });
          }
        });
      }
    });
  });
});
