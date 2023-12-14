import { $ } from "zx";

const pipVersion = (
  await $`pip index versions langflow | grep "langflow" | awk '{print $2}' | tr -d '()'`.quiet()
).stdout.trim();

try {
  await $`docker image inspect akarachan/langflow:${pipVersion}`.quiet();
} catch {
  console.log(pipVersion);
  process.exit(0);
}
process.exit(1);
