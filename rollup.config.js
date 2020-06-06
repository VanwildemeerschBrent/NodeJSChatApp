import copy from "rollup-plugin-copy";
export default {
  input: "server/server.js",
  output: {
    file: "server.js",
    format: "cjs",
  },
  plugins: [
    copy({
      targets: [
        { src: "app/index.html", dest: "dist/" },
        { src: "app/index.js", dest: "dist/" },
        { src: "app/reset.css", dest: "dist/" },
      ],
    }),
  ],
};
