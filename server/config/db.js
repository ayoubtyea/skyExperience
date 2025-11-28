import mongoose from 'mongoose';

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/skyexp';

const connectDB = async () => {
  let connectionUri = process.env.DATABASE_URL || DEFAULT_LOCAL_URI;
  
  // If using MongoDB Atlas and database name is missing, add it
  if (connectionUri.includes('mongodb+srv://') || connectionUri.includes('mongodb://')) {
    // Split URI and query string
    const [baseUri, ...queryParts] = connectionUri.split('?');
    const queryString = queryParts.length > 0 ? `?${queryParts.join('?')}` : '';
    
    // Extract the part after the protocol and credentials (everything after @host:port or @host)
    // Pattern: mongodb+srv://user:pass@host.net/dbname or mongodb+srv://user:pass@host.net/
    const hostMatch = baseUri.match(/^(mongodb\+?srv?:\/\/[^@]+@[^\/]+)(\/.*)?$/);
    
    if (hostMatch) {
      const [, connectionBase, pathPart] = hostMatch;
      // Check if pathPart exists and has a database name (not just a slash)
      // pathPart should be like "/dbname" or "/" or undefined
      if (!pathPart || pathPart === '/') {
        // No database name, add it
        connectionUri = connectionBase + '/skyexp' + queryString;
      }
      // If pathPart exists and is not just "/", database name is already therec
    }
  }
  
  // Clean up any double slashes in the path (but not in the protocol like mongodb+srv://)
  // Find the @ symbol (end of credentials) and replace // with / after it
  const atIndex = connectionUri.indexOf('@');
  if (atIndex !== -1) {
    const beforeAt = connectionUri.substring(0, atIndex + 1);
    const afterAt = connectionUri.substring(atIndex + 1).replace(/\/+/g, '/');
    connectionUri = beforeAt + afterAt;
  } else {
    // No @ found (unlikely for MongoDB), just clean up double slashes (but preserve mongodb:// or mongodb+srv://)
    connectionUri = connectionUri.replace(/([^:])\/+/g, '$1/');
  }
  
  try {
    await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected successfully → ${host}/${name}`);
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error('Error:', error.message);
    
    if (error.message.includes('IP')) {
      console.error('\n💡 Tip: Your IP address may not be whitelisted in MongoDB Atlas.');
      console.error('   Go to: https://www.mongodb.com/docs/atlas/security-whitelist/');
      console.error('   Or whitelist 0.0.0.0/0 to allow all IPs (less secure)');
    } else if (error.message.includes('authentication')) {
      console.error('\n💡 Tip: Check your MongoDB Atlas username and password');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 Tip: Check your internet connection and MongoDB Atlas cluster status');
    }
    
    console.error('\nTried connection string:', connectionUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    console.error('\n💡 Alternative: Use local MongoDB by setting DATABASE_URL to mongodb://127.0.0.1:27017/skyexp');
    process.exit(1);
  }
};

export default connectDB;
