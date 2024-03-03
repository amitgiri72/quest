import mongoose from "mongoose"
import Users from '../models/auth.js'

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        question: user.question,
        about: user.about,
        points: user.points,
        badges: user.badges,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id} = req.params
  const { name, about, tags } = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable...");
  }
  try {
    const updatedProfile = await Users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about : about, tags: tags }},
      { new: true}
    )
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message })
  }
}

export const getuser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate if userId is a valid ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}