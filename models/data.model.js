module.exports = mongoose => {
    const Data = mongoose.model(
      "data",
      mongoose.Schema(
        {
          data: String,
          accessTimesCount: Number,
          expirationTime: Date,
          shareCode: String,
          adminCode: String
        },
        { timestamps: true }
      )
    );
    return Data;
  };