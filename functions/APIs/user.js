// user.js

const { db } = require('../util/admin');
const { codeGenerator } = require('../util/codeGenerator');

// Twilio function
const { sendCode } = require('../util/twilio');

exports.createNewAccessCode = async (req, res) => {
	if (req.body.phoneNumber.trim() === '') {
		return response.status(400).json({ phoneNumber: 'Must not be empty' });
	}

	const phoneNumber = req.body.phoneNumber.trim();
	const newUser = {
		accessCode: codeGenerator()
	};

	try {
		const userCollectionRef = db.collection('users');

		// * Write to db new accessCode
		await userCollectionRef.doc(phoneNumber).set(newUser);
		// * Retrieve the newly written result
		const result = await userCollectionRef.doc(phoneNumber).get();

		if (result.exists) {
			const userAccessCode = await result.data().accessCode;

			const message = `Thanks for trying out this example firebase-twilio app, here's your code ${userAccessCode}`;

			await sendCode(phoneNumber, message);

			return res.status(200).json({ accessCode: userAccessCode });
		} else {
			throw new Error("Doc doesn't exist!");
		}
	} catch (error) {
		return res.status(500).json({ error: error.code });
	}
};

exports.validateAccessCode = async (req, res) => {
	if (req.body.accessCode.trim() === '') {
		return res.status(400).json({ accessCode: 'Must not be empty' });
	}

	try {
		const accessCode = req.body.accessCode.trim();

		// Retrieve document query associated with accessCode
		const userCollectionRef = db.collection('users');
		const queryRef = userCollectionRef.where('accessCode', '==', accessCode);
		const allUserSnapshot = await queryRef.get();

		// Check if there is a user with the accessCode in db
		const userList = [];
		allUserSnapshot.forEach(async (user) => {
			// Put user into snapshot list
			userList.push(user.data());

			// Reset access code to empty string
			const userId = user.id;
			await userCollectionRef.doc(userId).set({ accessCode: '' });
		});

		if (userList.length > 0) {
			return res.status(200).json({ success: true });
		} else {
			return res.status(200).json({ success: false });
		}
	} catch (error) {
		return res.status(500).json({ error: error.code });
	}
};
