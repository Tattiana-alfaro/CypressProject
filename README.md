# CypressProject

## Getting Started
The app needs the user create a cypess.env.json file with a valid user. By example

```shell
{
    "testUser" : "Katharina_Bernier",
    "testPassword" : "s3cret"
}
```

### Prerequisites

The only requirement for this project is to have [Node.js](https://nodejs.org/en/) **version 14** installed on your machine. Refer to the [.node-version](./.node-version) file for the exact version.

TypeScript will be added as a local dependency to the project, so no need to install it.

### Installation

```shell
npm install cypress --save-dev
```

### Run the app

```shell
npm run cy:open
```
