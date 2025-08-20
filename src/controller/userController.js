import User from '../model/userModel.js';

export const createUser = async (req, res, next) => {
  try {
    const { name, email, department } = req.body;
    if (!name || !email || !department) {
      return res.status(400).json({ message: 'name, email, department are required' });
    }
    const user = await User.create({ name, email, department });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error in fetching the user', err.message)  
}
};

export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};
