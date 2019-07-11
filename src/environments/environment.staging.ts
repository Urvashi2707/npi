/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    Mainurl:"/notify/svcwebservice.php",
    logout_url:"/notify/logout.php",
    graph:"/notify/svcgraph.php",
    slot_graph:"/notify/svcgraphslot.php",
    upload_file:"/notify/uploadfile.php",

    // Mainurl:"dev-partner.21north.in",
    // logout_url:"dev-partner.21north.in/logout.php",
    // graph:"dev-partner.21north.in/svcgraph.php",
    // slot_graph:"dev-partner.21north.in/svcgraphslot.php",
    // upload_file:"dev-partner.21north.in/uploadfile.php",
  };
