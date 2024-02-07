import Dexie from 'dexie';
export const db = new Dexie('database');  // database is database name with 1 version 
// 当需要更新表结构的时候，需要更新version()中的数字，否则回报如下error:
// Schema was extended without increasing the number passed to db.version()
db.version(2).stores({
  blogs: '++id, title , subtitle, content, publishedDate, updatedDate',// TODO: add author
  comments: '++id, content, publishedDate, blogId, parentCommentId',// TODO: add author
});