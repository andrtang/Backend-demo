const { execSync } = require("child_process");
const fs = require("fs");

function run(cmd) {
  console.log("\n> " + cmd);
  execSync(cmd, { stdio: "inherit" });
}

function ensureDir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}

try {
  // Fix common Windows npm ENOENT
  ensureDir(process.env.APPDATA + "\\npm");
  ensureDir(process.env.APPDATA + "\\npm-cache");

  console.log("Installing root dependencies...");
  run("npm install");

  console.log("Ensuring MongoDB data directory...");
  ensureDir("C:\\mongodb-data");

  console.log("Creating backend/.env if missing...");
  const envPath = "backend/.env";
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(
      envPath,
      "PORT=5001\nMONGO_URI=mongodb://127.0.0.1:27017/tasksdb\n",
      "utf8"
    );
    console.log("Created " + envPath);
  } else {
    console.log(envPath + " already exists (not overwritten).");
  }

  console.log("Installing backend dependencies...");
  run("cd backend && npm install");

  console.log("Installing frontend dependencies...");
  run("cd frontend && npm install");

  console.log("\nSetup complete ✅");
} catch (e) {
  console.error("\nSetup failed ❌");
  process.exit(1);
}
