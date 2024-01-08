// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        try {
          console.log("Sending data to backend:", {
            username: credentials.username,
            password: credentials.password,
            address: credentials.address,
            port: credentials.port,
          });

          const mongoConnectionResponse = await fetch(
            "http://172.17.0.1:4000/connect-to-mongodb", // Consider updating this URL for production
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
                address: credentials.address,
                port: credentials.port,
              }),
            }
          );

          if (mongoConnectionResponse.ok) {
            return { name: credentials.username };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error connecting to MongoDB:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    issuer: process.env.NEXTAUTH_URL, // Optionally add this for JWT issuer
  },
});

export { handler as GET, handler as POST };
