import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) throw new AppError('User must be authenticated', 401);

    // Deletar avatar anteriror
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
