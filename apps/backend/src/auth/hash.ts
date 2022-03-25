import * as argon2 from "argon2";

export async function createHash(plain: string | Buffer) {
  return await argon2.hash(plain, { type: argon2.argon2id });
}

export async function verifyHash(hash: string, plain: string | Buffer) {
  return await argon2.verify(hash, plain);
}
