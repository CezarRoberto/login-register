import { Request, Response} from 'express'
import { User } from '../entities/User';
import {getRepository } from 'typeorm'
class UserController {

  // CADASTRO DE USUARIOS
  async createUser(req: Request, res: Response) {
    const repository = getRepository(User)
    const {username, email, password} = req.body;
    const AlreadyUser = await repository.findOne({where: { email, username}})

    if(AlreadyUser) {
      return res.sendStatus(416)
    }

    const user = repository.create({ username, email, password })
    await repository.save(user)

    return res.json(user).status(201)
  }

  // TODOS OS USUARIOS
  async getAllUsers(req: Request, res: Response) {
    const repository = getRepository(User)
    const users = await repository.find();
    return res.json(users)
  }

// DELETE USER 
  async deleteUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const {Id} = req.params;
    const user = await repository.delete(parseInt(Id))
    return res.send("DELETED").status(200)
  }

}


export default new UserController;