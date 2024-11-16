"use server";
//   888888888888888   Creat account flow 88888888888888888888888
// --------------------------------------------------------------
// 1. User enters full name and email
// 2. Check if user already exists (we will use to identify if we need to create a new user or not)
// 3. Send OTP to user's email
// 4. This will send a secret key for creating a session. The key
// 5. Create a new user document  if the user is a new user
// 6. Return the user's account ID that will be used to complete the login
// 7. Verify OTP and authenticate the user to login
//
//

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,

    [Query.equal("email", [email])],
  );
  return result.total > 0 ? result.documents[0] : null;
};
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};
export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send OTP");
  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: "/images/avatar-blank.png",
        accountid,
      },
    );
  }
  return parseStringify({ accountid });
};
