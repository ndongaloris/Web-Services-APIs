module.exports = (mongoose) => {
    const User = mongoose.model(
        "users",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                middleName: String,
                favoriteColor: String,
                email: String,
                birthday: String,
            },
        )
    );

    return User;
};
