import User from "../models/user.models.js"

export const searchUser = async (req, res) => {
    try {
        const { username: searchUsername } = req.params;
        const user = await User.find({ username: { $regex: searchUsername, $options: 'i' } }).select('-password');
        if (!user)
            res.status(500).json({ error: "Can't find the user." });

        console.log(user);

        res.status(200).json(user);


    } catch (error) {
        console.log('Error in searchUser controller', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export const searchOneUser = async (req, res) => {
    try {
        const { username: searchUsername } = req.params;
        const user = await User.findOne({ username: searchUsername }).select('-password');
        if (!user)
            res.status(500).json({ error: "Can't find the user." });

        console.log(user);

        res.status(200).json(user);
        
    } catch (error) {
        console.log('Error in searchOneUser controller', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('Error in getAllUsers controller', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
}