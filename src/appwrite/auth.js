import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.VITE_APPWRITE_URL);
    this.client.setProject(config.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  // Create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login(email, password);
      }
    } catch (error) {
      throw error;
    }
  }

  // Login
  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logoutUser :: error", error);
    }
  }
}

const authServices = new AuthServices();
export default authServices;
