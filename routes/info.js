import compression from "compression";
import { Router } from "express";
import { cpus } from "os";

const infoRouter = Router();

infoRouter.get("/", compression(), (req, res) => {
  const info = {
    argumentosEntrada: process.argv,
    SO: process.platform,
    version: process.version,
    memoria: process.memoryUsage().rss,
    path: process.argv[1],
    processId: process.pid,
    carpeta: process.cwd(),
    procesadores: cpus().length,
  };

  // console.log(info);
  res.json(info);
});

export default infoRouter;
