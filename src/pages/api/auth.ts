import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebase/firebaseAdmin";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "Erro ao autenticar" });
  }
}
