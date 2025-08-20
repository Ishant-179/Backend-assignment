import AllowanceRequest from '../model/allowanceRequestModel.js';
import User from '../model/userModel.js';
import { sendNewRequestEmail } from '../service/email.js';

export const createRequest = async (req, res, next) => {
  try {
    const { userId, amount, description, date } = req.body;
    if (!userId || amount === undefined) {
      return res.status(400).json({ message: 'userId and amount are required' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const requestDoc = await AllowanceRequest.create({
      user: userId,
      amount,
      description,
      date
    });

    try {
      await sendNewRequestEmail({
        employeeName: user.name,
        employeeEmail: user.email,
        department: user.department,
        amount,
        description,
        date: requestDoc.date
      });
    } catch (Err) {
      console.error('Email error:', Err.message)
    }

    const populated = await requestDoc.populate('user', 'name email department');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

export const getRequests = async (_req, res, next) => {
  try {
    const list = await AllowanceRequest.find()
      .populate('user', 'name email department')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await AllowanceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email department');

    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await AllowanceRequest.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
