import mongoose from 'mongoose';

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/skyexp';

const connectDB = async () => {
  let connectionUri = process.env.DATABASE_URL || DEFAULT_LOCAL_URI;
  
  if (connectionUri) {
    connectionUri = connectionUri.trim().replace(/^["']|["']$/g, '');
  }
  
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
    console.log('🔌 Attempting to connect to MongoDB...');
    const maskedUri = connectionUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
    console.log('📍 Connection string:', maskedUri);
    
    await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    const { host, name } = mongoose.connection;
    console.log(`✅ MongoDB connected successfully → ${host}/${name}`);
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error('Error:', error.message);
    console.error('Error code:', error.code);
    
    const maskedUri = connectionUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
    console.error('\n📍 Tried connection string:', maskedUri);
    
    if (error.message.includes('IP') || error.message.includes('whitelist') || error.code === 'ENOTFOUND') {
      console.error('\n💡 IP Whitelist Issue Detected:');
      console.error('   1. Go to: https://cloud.mongodb.com');
      console.error('   2. Navigate to: Network Access (left sidebar)');
      console.error('   3. Click: "Add IP Address"');
      console.error('   4. Click: "Allow Access from Anywhere" (adds 0.0.0.0/0)');
      console.error('   5. Wait 1-2 minutes for changes to propagate');
      console.error('   6. Restart your Render service');
    } else if (error.message.includes('authentication') || error.message.includes('bad auth')) {
      console.error('\n💡 Authentication Issue:');
      console.error('   - Check your MongoDB Atlas username and password');
      console.error('   - Verify credentials in Render environment variables');
      console.error('   - Make sure DATABASE_URL has correct username:password');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 Network/DNS Issue:');
      console.error('   - Check your MongoDB Atlas cluster status');
      console.error('   - Verify the cluster hostname in your connection string');
      console.error('   - Ensure your cluster is not paused');
    }
    
    console.error('\n💡 Alternative: Use local MongoDB by setting DATABASE_URL to mongodb://127.0.0.1:27017/skyexp');
    process.exit(1);
  }
};

export default connectDB;
