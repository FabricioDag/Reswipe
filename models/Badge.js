const badgeSchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String },
    acquisitionDate: { type: Date, default: Date.now },
    requirements: { type: String },
    // reward: { type: String }
});

module.exports = mongoose.model('Badge', badgeSchema);