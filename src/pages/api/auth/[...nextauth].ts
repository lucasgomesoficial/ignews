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
    async session({ session, user, token }) {
      try {
        const userActiveSubscription = await fauna.query(
          req.Get(
            req.Intersection([
              req.Match(
                req.Index("subscription_by_user_ref"),
                req.Select(
                  "ref",
                  req.Get(
                    req.Match(
                      req.Index("user_by_email"),
                      req.Casefold(session.user.email)
                    )
                  )
                )
              ),
              req.Match(req.Index("subscription_by_status"), "active"),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch (e) {
        console.log(e);
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
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
