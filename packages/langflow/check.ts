import { $ } from "zx";

async function main() {
  const pipVersion = (
    await $`pip index versions langflow | grep "langflow" | awk '{print $2}' | tr -d '()'`.quiet()
  ).stdout.trim();

  try {
    await $`docker image inspect akarachan/langflow:${pipVersion}`.quiet();
  } catch {
    // Image not exists, build it
    console.log(pipVersion);
    process.exit(0);
  }
  // Image exists, do nothing
  process.exit(1);
}

main();
