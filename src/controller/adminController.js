const models = require('../models/index');

exports.rejectWorker = async (req, res) => {
  try {
    const deleted = await models.User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        error: 'Customer not found.',
      });
    }

    res.status(204).json({
      status: 'successful',
      data: null, // No data to return
    });
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
  }
};

//function to get all feedbacks for the admin
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await models.Feedback.findAll();
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({
        error: 'No feedbacks found.',
      });
    }

    res.status(200).json({
      status: 'successful',
      data: feedbacks,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
  }
};

exports.acceptWorker = async (req, res) => {};

// function for deleting ANY user which will be used by admin
exports.deleteAnyUser = async (req, res) => {
  try {
    const deleted = await models.User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        error: 'Customer not found.',
      });
    } else {
      res.status(204).json({
        status: 'successful',
        data: null, // No data to return
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
  }
};
