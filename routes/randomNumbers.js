import { Router } from "express";
import { fork } from "child_process";

const randomNumbersRouter = Router();

// const longProcess = fork("./helpers/longProcess.js");

randomNumbersRouter.get("/", (req, res) => {
  const { cant } = req.query;

  // longProcess.send(parseInt(cant) || 100000000);

  // longProcess.on("message", (message) => {
  //   res.end(JSON.stringify(message.arrayNumbers, null, 2));
  // });
  res.send("Ruta desabilitada");
});

export default randomNumbersRouter;
