import Submission from "../models/Submission.js";
import { Resend } from 'resend';
import { Client } from '@hubspot/api-client';

const resend = new Resend(process.env.RESEND_API_KEY);
const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })

const submissionPost = async (req, res) => {
    try {
        const { name, email, reason, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required" });
        }

        // Save to database
        const newSubmission = new Submission({
            name,
            email,
            reason,
            message
        });

        await newSubmission.save();

        // Send email notification with resend
        try {
            const { data, error } = await resend.emails.send({
                from: `Portfolio Contact <onboarding@resend.dev>`,
                replyTo: email,
                to: [process.env.MY_EMAIL],
                subject: `Contact Form Enquiries: ${reason || 'General'}`,
                text: `Name: ${name}\nEmail: ${email}\nReason: ${reason || 'Not specified'}\n\nMessage:\n${message}`
            });

            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent successfully!', data);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }

        // Sync submissions to Hubspot
        try {
            const contactObj = {
                properties: {
                    firstname: name,
                    email: email,
                    reason_for_reaching_out: reason,
                    contact_message: message,
                },
            };

            const publicObjectSearchRequest = {
                filterGroups: [
                    {
                        filters: [
                            {
                                propertyName: 'email',
                                operator: 'EQ',
                                value: email
                            }
                        ]
                    }
                ]
            }
            const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest)

            if (response.results.length > 0) {
                const contactId = response.results[0].id;
                const updatedContact = await hubspotClient.crm.contacts.basicApi.update(contactId, contactObj)
                console.log('HubSpot contact updated:', updatedContact.id);
            }
            else {
                const syncedContact = await hubspotClient.crm.contacts.basicApi.create(contactObj);
                console.log('HubSpot contact created:', syncedContact.id);
            }
        } catch (error) {
            console.error('HubSpot Sync Error:', error.response?.body || error.message);
        }

        return res.status(201).json({ message: "New submission saved" });
    } catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({ error: "Something went wrong saving your message" });
    }


}


export { submissionPost }

