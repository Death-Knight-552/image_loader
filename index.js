import { default as webExt } from "web-ext";

let current_dir = process.cwd()
const distribution = `${current_dir}/dist`;

let buildJSON = await webExt.cmd.build(
    {
      sourceDir: `${current_dir}/src`,
      artifactsDir: `${distribution}`,
      overwriteDest: true,
      browser: "chromium",
    },
    { shouldExitProgram: false }
  )

console.log(buildJSON["extensionPath"]);

