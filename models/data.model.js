module.exports = mongoose => {
    const Data = mongoose.model(
      "data",
      mongoose.Schema(
        {
          data: String,
          accessTimesCount: Number,
          expirationTime: Date
        },
        { timestamps: true }
      )
    );
    return Data;
  };