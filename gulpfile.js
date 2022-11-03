import gulp from "gulp";
// import uglify from "gulp-uglify";
import { deleteSync } from "del";
import nodemon from "gulp-nodemon";
import { execSync } from "child_process";

const buildDir = "dist";
const compiledDir = "compiled";
// const srcDir = "src";
const startFile = "main.js";

function typscriptTranspile() {
  execSync(`npx tsc`);
}

gulp.task("watchmon", (cb) => {
  deleteSync(compiledDir);
  typscriptTranspile();
  gulp.src(`${compiledDir}/**/*.js`).pipe(gulp.dest(compiledDir, {}));
  nodemon({
    script: `${compiledDir}/${startFile}`,
    verbose: true,
    ignore: ["node_modules/*", buildDir, compiledDir, "trash"],
    ext: "ts",
  }).on("restart", () => {
    typscriptTranspile();
  });
  cb();
});

const watch = gulp.series(["watchmon"]);

export default watch;
