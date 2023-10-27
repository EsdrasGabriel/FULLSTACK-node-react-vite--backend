import { Request, Response } from "express";

interface ICidade {
  nome: string;
}

export const create = (req: Request, res: Response) => {

  const data: ICidade = req.body;
  console.log(data.nome);

  return res.send("Create!");
};
