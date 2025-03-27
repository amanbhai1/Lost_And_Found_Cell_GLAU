const itemSchema = new mongoose.Schema({
  // ... existing fields ...
  claims: [{
    details: String,
    name: String,
    email: String,
    sapId: String,
    branch: String,
    year: String,
    contactNumber: String,
    claimedAt: { type: Date, default: Date.now }
  }]
}); 