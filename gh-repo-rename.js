#!/usr/bin/env node

const ins = require("util").inspect;

const shell = require('shelljs');
const { Command } = require('commander');
const program = new Command();
const { version } = require("./package.json")

program
  .version(version)
  .option('-r, --repo <reponame>', 'repo')
  .option('-o, --org <organization>', 'organization')
  .option('-n, --name <name>', 'name');

program.parse(process.argv);

let args = program.args;
debugger;

const getRepoId = (owner, name) => `
query {
    repository(owner: "${owner}", name: "${name}"){
      id
    }
  }
 `;

const renameRepo = (id, newName) => `   
  mutation {
    updateRepository(input: { name: "${newName}", repositoryId: "${id}" }) {
      repository{
        name
      }
    }
  }
`;

let {org , repo, name } = program.opts(); // de esta manera estoy creando ALIAS 

if(!org || !repo || !name) program.help();

// Comprobar que git y gh están instalados
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.which('gh')) {
  shell.echo('Sorry, this script requires gh cli');
  shell.exit(1);
}

// Ejecuto la primera query
let r = shell.exec(`gh api graphql -f query='${getRepoId(org, repo)}' --jq '.data.repository.id'`,
                  {silent: true}
                  );
                  
if (r.code !== 0) {
  console.error(r.stderr)
  process.exit(r.code)
};

console.log("Repository id: ", r.stdout)

// Ejecuto la segunda query
const ID = r.stdout.replace(/\s+$/g,'');

r = shell.exec(`gh api graphql -f query='${renameRepo(ID, name)}' --jq '.data.updateRepository.repository.name'`, 
              {silent:true}
              );

if (r.code !== 0) {
  console.error(r.stderr)
  process.exit(r.code)
};

console.log(`The repository '${org}/${repo}' has been renamed to '${r.stdout.replace(/\s+$/, '')}'`);


