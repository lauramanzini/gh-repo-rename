 # Extension gh-repo-rename

 ## Description 

 Through this gh extension you will be able to rename a repository belonging to an organization.


 ## Installation

This extension requires the installation of gh api. In order to install gh run the following command:

 ```
 brew install gh 
 ```

To install the gh-repo-rename extension execute:

 ```
 gh extension install lauramanzini/gh-repo-rename
 ```

 ## Usage

The extension's options are the following:

 ```
 Usage: gh-repo-rename [options]

 Options:
  -V, --version             output the version number
  -r, --repo <reponame>     repo
  -o, --org <organization>  organization
  -n, --name <name>         name
  -h, --help                display help for command
 ```

The extension is used by executing the command:

```
gh-repo-rename -o <organization> -r <repoName> -n <repoNewName>
```

 ## Author

 Laura Manzini - alu0101531700@ull.edu.es

