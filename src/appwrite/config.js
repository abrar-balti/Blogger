import config from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

//class
export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client;
    this.client.setEndpoint(config.VITE_APPWRITE_URL);
    this.client.setProject(config.VITE_APPWRITE_PROJECT_ID);
    this.databases = new Databases();
    this.bucket = new Storage();
  }

  // create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: createPost :: error", errors);
    }
  }

  //update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: updatePost :: error ", error);
    }
  }

  //deletePost
  async deletePost() {
    try {
      return await this.databases.deleteDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Services:: deletePost :: error", error);
      return false;
    }
  }

  //get a singlePost

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service:: getPost:: error", error);
      return false;
    }
  }

  // getallposts
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("Appwrite Serives :: getAllPosts :: error", error);
      return false;
    }
  }

  //upload files
  async uploadFiles(file) {
    try {
      return await this.bucket.createFile(
        config.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFiles :: error", error);
      return false;
    }
  }

  //delete Files
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        config.VITE_APPWRITE_BUCKET_ID,
        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  // preview File
  getPreview(fileId) {
    return this.VITE_APPWRITE_BUCKET_ID.getPreview(
      config.VITE_APPWRITE_BUCKET_ID,
      fileId
    );
  }
}

const servies = new Services();
export default servies;
