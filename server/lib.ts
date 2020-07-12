import fetch from "cross-fetch";
const fs = require("fs");

export const uploadStream = (stream, path) =>
  new Promise((resolve, reject) => {
    stream
      .on("error", (error) => {
        if (stream.truncated) {
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .on("end", resolve)
      .pipe(fs.createWriteStream(path));
  });
