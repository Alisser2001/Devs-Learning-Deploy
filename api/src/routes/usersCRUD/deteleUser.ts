import { Request, Response } from "express";
const { Users } = require("../../db");

export async function deleteCurrentUser(req: Request, res: Response) {
  try {
    const { id } = req.query;

    const user = await Users.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      Users.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send(`The user has been deleted`);
    }
    return res.status(401).send(`The user doesnt exists`);
  } catch (err) {
    return res.status(404).send("Error: " + err);
  }
}
