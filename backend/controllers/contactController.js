import Submission from "../models/Submission.js";

const submissionPost = async (req, res) => {
    try {
        const { name, email, reason, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required" });
        }
        const newSubmission = new Submission({
            name,
            email,
            reason,
            message
        })
        await newSubmission.save()
        return res.status(201).json({ message: "New submission saved" })
    } catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({ error: "Something went wrong saving your message" });
    }


}


export { submissionPost }

