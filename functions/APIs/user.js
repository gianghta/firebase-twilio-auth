// user.js

const { db } = require('../util/admin');
const { codeGenerator } = require('../util/codeGenerator');

exports.createNewAccessCode = (req, res) => {
	if (req.body.phoneNumber.trim() === '') {
		return response.status(400).json({ phoneNumber: 'Must not be empty' });
	}

	const newUser = {
		phoneNumber: req.body.phoneNumber,
		accessCode: codeGenerator()
	};

	db
		.collection('users')
		.add(newUser)
		.then((doc) => {
			const userAccessCode = doc.accessCode;
			return res.status(200).json({ accessCode: userAccessCode });
		})
		.catch((err) => {
			return response.status(500).json({ error: err.code });
		});
};

exports.validateAccessCode = (req, res) => {
	if (req.body.accessCode.trim() === '') {
		return res.status(400).json({ accessCode: 'Must not be empty' });
	}

	// Retrieve document associated with accessCode
	const document = db.doc(`/users/${req.body.accessCode}`);
	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: "User with this code doesn't exist" });
			}
			return res.status(200).json({ success: true });
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
};
