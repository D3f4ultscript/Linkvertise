// API for key validation and management
// This would be hosted on Vercel or a similar platform

// Database mock (would be replaced by a real database in production)
const keysDatabase = new Map();

// Key validation endpoint
exports.validateKey = (req, res) => {
    const { key, userId } = req.query;
    
    if (!key || !userId) {
        return res.status(400).json({ 
            valid: false, 
            message: "Missing key or userId parameter" 
        });
    }
    
    // Check if key exists in database
    const keyData = keysDatabase.get(key);
    
    // If key exists, check if it's valid for this user
    if (keyData) {
        // Check if key is assigned to this user or not assigned yet
        if (keyData.userId === userId || !keyData.userId) {
            // Check if key is still valid (6 hours since creation)
            const currentTime = Date.now();
            const keyAge = currentTime - keyData.createdAt;
            const sixHoursInMs = 6 * 60 * 60 * 1000;
            
            if (keyAge < sixHoursInMs) {
                // If key wasn't assigned yet, assign it to this user
                if (!keyData.userId) {
                    keyData.userId = userId;
                    keysDatabase.set(key, keyData);
                }
                
                return res.status(200).json({
                    valid: true,
                    message: "Key is valid",
                    expiresAt: keyData.createdAt + sixHoursInMs
                });
            } else {
                return res.status(200).json({
                    valid: false,
                    message: "Key has expired"
                });
            }
        } else {
            return res.status(200).json({
                valid: false,
                message: "Key is being used by another user"
            });
        }
    } else {
        return res.status(200).json({
            valid: false,
            message: "Invalid key"
        });
    }
};

// Generate key endpoint
exports.generateKey = (req, res) => {
    // Generate a random 30-character key
    const key = generateRandomKey(30);
    
    // Store key in database with creation timestamp
    keysDatabase.set(key, {
        createdAt: Date.now(),
        userId: null // Will be assigned when validated
    });
    
    return res.status(200).json({
        key: key,
        message: "Key generated successfully",
        expiresIn: "6 hours"
    });
};

// Helper function to generate random alphanumeric key
function generateRandomKey(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
} 