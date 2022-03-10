import { query as req } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: { scope: "read:user" },
      },
    }),
  ],
  secret: process.env.SIGNING_KEY,
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      try {
        await fauna.query(
          req.If(
            req.Not(
              req.Exists(
                req.Match(req.Index("user_by_email"), req.Casefold(email))
              )
            ),
            req.Create(req.Collection("users"), { data: { email } }),
            req.Get(req.Match(req.Index("user_by_email"), req.Casefold(email)))
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
