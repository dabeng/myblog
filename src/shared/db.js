import Dexie from 'dexie';
export const db = new Dexie('database');  // database is database name with 1 version 
db.version(1).stores({
  blogs: '++id, title , subtitle, content, publishedDate, updatedDate',// TODO: add author
  comments: '++id, blogId, content, publishedDate',// TODO: add author
  replies: '++id, commentId, content, publishedDate'// TODO: add author
});