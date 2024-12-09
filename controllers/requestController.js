const RoommateRequest = require("../model/requestModel");

const sendRequest = async (req, res) => {
  const { receiver_ID, sender_ID, sender_name, description } = req.body;

  if (!receiver_ID || !sender_ID || !sender_name || !description) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const status_ID = await RoommateRequest.addRequest(receiver_ID, sender_ID, sender_name, description);
    res.status(201).json({ success: "Request successfully sent.", status_ID });
  } catch (err) {
    console.error("sendRequest error: ", err);
    res.status(500).json({ message: "Failed to send request.", details: err.message });
  }
};

const acceptRequest = async (req, res) => {
  const { receiver_ID, accepted_by } = req.body;

  if (!receiver_ID || !accepted_by) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const status_ID = await RoommateRequest.acceptRequest(receiver_ID, accepted_by);
    res.status(201).json({ success: "Request successfully accepted.", status_ID });
  } catch (err) {
    console.error("acceptRequest error: ", err);
    res.status(500).json({ message: "Failed to accept request.", details: err.message });
  }
};

const declineRequest = async (req, res) => {
  const { receiver_ID, declined_by } = req.body;

  if (!receiver_ID || !declined_by) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const status_ID = await RoommateRequest.declineRequest(receiver_ID, declined_by);
    res.status(201).json({ success: "Request successfully declined.", status_ID });
  } catch (err) {
    console.error("declineRequest error: ", err);
    res.status(500).json({ message: "Failed to decline request.", details: err.message });
  }
};

const getRequestStatus = async (req, res) => {
  const { receiver_ID, sender_ID } = req.query;

  if (!receiver_ID && !sender_ID) {
    return res.status(400).json({ message: "Either receiver_ID or sender_ID must be provided." });
  }

  try {
    const results = await RoommateRequest.fetchStatus(receiver_ID, sender_ID);
    if (results.length === 0) {
      return res.status(404).json({ message: "No requests found." });
    }
    res.status(200).json(results);
  } catch (err) {
    console.error("getRequestStatus error: ", err);
    res.status(500).json({ message: "Failed to fetch request status.", details: err.message });
  }
};

module.exports = { sendRequest, acceptRequest, declineRequest, getRequestStatus };
