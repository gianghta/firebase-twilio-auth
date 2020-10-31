require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendCode = async (phone, message) => {
	const client = require('twilio')(accountSid, authToken);
	try {
		const newMessage = await client.messages.create({
			body: message,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phone
		});
		console.log(newMessage.sid, 'success');
	} catch (error) {
		console.log(err);
	}
};

module.exports = { sendCode };
