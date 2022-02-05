import { Request, Response} from 'express'
import { User } from '../entities/User';
import {getRepository } from 'typeorm'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
class AuthController {
  // LOGIN
  async login(req: Request, res: Response) {
    const repository = getRepository(User);
    const {email, password} = req.body;

    const user = await repository.findOne({where: {email}})
    if(!user) {
      return res.sendStatus(404)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
      return res.sendStatus(404)
    }

    const token = jwt.sign({ id: user.id }, 'secret', {expiresIn: '1d'});

    delete user.password;
    return res.json({
      user,
      token
    })
  }

}


export default new AuthController;