import mongoose from "mongoose";
import Users from '../models/auth.js'
import Questions from "../models/questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Question unavailable...')
  }

  try {
    // Reward user for answering the question
    const user = await Users.findById(userId);
    user.points += 5; // Adjust the points as per your preference
    user.answersGiven += 1;

    // Check if the user has achieved a badge
    if (user.answersGiven === 5 && !user.badges.includes('Elite Explorer')) {
      user.badges.push('Elite Explorer');
    } else if (user.answersGiven === 20 && !user.badges.includes('Master Explorer')) {
      user.badges.push('Master Explorer');
    } else if (user.answersGiven > 20 && !user.badges.includes('Community Champion')) {
      user.badges.push('Community Champion');
    }

    await user.save();
       // Update the question with the new answer
       const updatedQuestion = await Questions.findByIdAndUpdate(
        _id,
        {
          $addToSet: {
            answer: [{ answerBody, userAnswered, userId }],
          },
          $set: {
            noOfAnswers: noOfAnswers,
          },
        },
        { new: true }
      );
  
      res.status(200).json({ updatedQuestion, user });

  
  } catch (error) {
    res.status(400).json("Error while updating");
    console.log(error)
  }
}

const updateNoofQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: {
        noOfAnswers: noOfAnswers
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params
  const { answerId, noOfAnswers } = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }

  updateNoofQuestions(_id, noOfAnswers)

  try {
    await Questions.updateOne(
      {_id},
      { $pull: {
        // pulls out the answer with same id
        answer: { _id: answerId}
      }}
    )
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
}