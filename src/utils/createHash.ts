import * as bcrypt from 'bcrypt';

export async function createHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
