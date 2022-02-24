module.exports = mongoose => {
    const Data = mongoose.model(
      "data",
      mongoose.Schema(
        {
          data: String,
          accessTimesCount: Number,
          expirationTime: Date,
          shareCode: {
            type: String,
            unique: true
          },
          adminCode: {
            type: String,
            unique: true
          }
        },
        { timestamps: true }
      )
    );
    return Data;
  };